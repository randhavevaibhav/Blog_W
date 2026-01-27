import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../auth/useAuth";

import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getLocalStorageItem } from "@/utils/browser";
import { cloneDeep } from "lodash-es";
import { useParams } from "react-router-dom";

export const useDisLikeComment = ({ commentId }) => {
  const { auth } = useAuth();
  const {  postId } = useParams();
  const queryClient = useQueryClient();
  const { getAllPostCommentsQueryKey } = useQueryKey();

  const { dislikeCommentService } = commentLikesServices();
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
        const { page, commentId } = data;
        const cachedData = queryClient.getQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy: sortCmtBy,
          }).queryKey,
        );

        // console.log("cachedData ====>", cachedData);
        let clonedCachedData = cloneDeep(cachedData);
        const targetPage = clonedCachedData.pages[page];
        targetPage.comments[`@${commentId}`].isCmtLikedByUser = "false";
        targetPage.comments[`@${commentId}`].likes =
          parseInt(targetPage.comments[`@${commentId}`].likes) - 1;
        queryClient.setQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy: sortCmtBy,
          }).queryKey,
          clonedCachedData,
        );
        // console.log("clonedCachedData ==> ",clonedCachedData)
        return { prevData: cachedData, newData: clonedCachedData };
      } catch (error) {
        console.error(
          "Error occurred in onMutate callback of useLikeComment hook. ",
          error,
        );
      }
    },

    onError: (err, variables, context) => {
      try {
        queryClient.setQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy: sortCmtBy,
          }).queryKey,
          context.prevData,
        );
        const responseError = err.response.data?.message;

        console.log("responseError =====> ", responseError);
        console.log("err =====> ", err);

        if (responseError) {
          toast.error(`Error !!\n${err.response.data?.message}`);
        } else {
          toast.error(`Unknown error occurred !! `);
        }
      } catch (error) {
        console.error(
          "Error occurred in onError callback of useDisLikeComment hook. ",
          error,
        );
      }
    },
  });

  return {
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
