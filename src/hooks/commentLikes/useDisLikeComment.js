import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { getLocalStorageItem } from "@/utils/browser";

export const useDisLikeComment = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const queryClient = useQueryClient();
  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const currentUserId = auth.userId;
  const getAllPostCommentsQueryKey = [
    "getAllPostComments",
    postId.toString(),
    userId.toString(),
    sortCmtBy,
  ];

  const dislikeCommentService = async ({ commentId }) => {
    const res = await axiosPrivate.post(`/comment/dislike`, {
      userId: currentUserId,
      commentId,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: disLikeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: dislikeCommentService,
    onMutate: (data) => {
      const commentId = data.commentId;

      const cachedData = queryClient.getQueryData(getAllPostCommentsQueryKey);
      const clonedCachedData = _.cloneDeep(cachedData);
      // console.log("res.comment ===> ",res.comment)

      const pages = clonedCachedData.pages;
      // console.log("pages ===> ", pages);

      const updateComment = (comments, commentId) => {
        comments.forEach((comment) => {
          if (Number(comment.commentId) === Number(commentId)) {
            // console.log("found match ===> ", comment);

            comment.likes = Number(comment.likes) - 1;
            comment.isCmtLikedByUser = false;
            return comment;
          } else if (comment.replies.length > 0) {
            return updateComment(comment.replies, commentId);
          }

          return comment;
        });

        return comments;
      };

      const updatePages = (pages, commentId) => {
        const updatedPages = pages.map((page) => {
          // console.log("page ==> ", page);
          const updatedCmt = updateComment(page.comments, commentId);
          return {
            ...page,
            comments: updatedCmt,
          };
        });

        return updatedPages;
      };
      // console.log("pages ==> ",pages);
      const updatedPages = updatePages(pages, commentId);
      //  console.log("updatedPages ==> ", updatedPages);
      clonedCachedData.pages = updatedPages;

      queryClient.setQueryData(getAllPostCommentsQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      const responseError = err.response.data?.message;
      queryClient.setQueryData(getAllPostCommentsQueryKey, context.prevData);
      console.log("responseError =====> ", responseError);
      console.log("responseError =====> ", err);
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: (res) => {
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     "getAllPostComments",
        //     postId.toString(),
        //     userId.toString(),
        //     "desc",
        //   ],
        // });
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     "getAllPostComments",
        //     postId.toString(),
        //     userId.toString(),
        //     "asc",
        //   ],
        // });
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     "getAllPostComments",
        //     postId.toString(),
        //     userId.toString(),
        //     "likes",
        //   ],
        // });
    },
  });

  return {
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
