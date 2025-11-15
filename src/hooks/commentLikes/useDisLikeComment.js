import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import { getLocalStorageItem } from "@/utils/browser";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useDisLikeComment = ({ commentId }) => {
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const queryClient = useQueryClient();
  const { dislikeCommentService } = commentLikesServices();
  const { getAllPostCommentsQueryKey } = useQueryKey();
  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const currentUserId = auth.userId;

  const {
    mutate: disLikeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return dislikeCommentService({
        commentId,
        userId: currentUserId,
      });
    },
    onMutate: (data) => {
      try {
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

        // console.log("pages ===> ", pages);

        const updateComment = ({ comments, commentId }) => {
          comments.forEach((comment) => {
            if (Number(comment.commentId) === Number(commentId)) {
              // console.log("found match ===> ", comment);

              comment.likes = Number(comment.likes) - 1;
              comment.isCmtLikedByUser = false;
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
      } catch (error) {
        console.log(`Error while disliking a comment ==> `, error);
      }
    },

    onError: (err, variables, context) => {
      const responseError = err.response.data?.message;
      queryClient.setQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy: sortCmtBy,
        }).queryKey,
        context.prevData
      );
      console.log("responseError =====> ", responseError);
      console.log("responseError =====> ", err);
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    },
    onSettled: (res) => {},
  });

  return {
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
