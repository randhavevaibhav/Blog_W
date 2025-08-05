import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import {cloneDeep} from "lodash-es";
import { getLocalStorageItem } from "@/utils/browser";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
export const useLikeComment = ({ commentId }) => {
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const queryClient = useQueryClient();
  const { likeCommentService } = commentLikesServices();
  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const { getAllPostCommentsQueryKey } = useQueryKey();

  const currentUserId = auth.userId;

  const {
    mutate: likeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return likeCommentService({
        userId: currentUserId,
        commentId,
        createdAt: new Date(),
      });
    },
    onMutate: (data) => {
      // console.log("like data ===> ", data);
      const commentId = data.commentId;
      const page = data.page;

      const cachedData = queryClient.getQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy: sortCmtBy,
        }).queryKey
      );
      const clonedCachedData = cloneDeep(cachedData);
      // console.log("res.comment ===> ",res.comment)

      const pages = clonedCachedData.pages;
      // console.log("pages ===> ", pages);

      const updateComment = ({ comments, commentId }) => {
        comments.forEach((comment) => {
          if (Number(comment.commentId) === Number(commentId)) {
            // console.log("found match ===> ", comment);

            comment.likes = Number(comment.likes) + 1;
            comment.isCmtLikedByUser = true;
            return comment;
          } else if (comment.replies.length > 0) {
            return updateComment({ comments: comment.replies, commentId });
          }

          return comment;
        });

        return comments;
      };

      const updatePage = ({ page }) => {
        updateComment({ comments: page.comments, commentId });
      };

      updatePage({ page: clonedCachedData.pages[page] });

      queryClient.setQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy: sortCmtBy,
        }).queryKey,
        clonedCachedData
      );

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy: sortCmtBy,
        }).queryKey,
        context.prevData
      );
      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("err =====> ", err);

      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    },
    onSettled: (res) => {},
  });

  return {
    likeComment,
    isPending,
    isError,
    error,
  };
};
