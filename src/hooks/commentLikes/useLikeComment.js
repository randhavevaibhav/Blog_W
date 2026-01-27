import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getLocalStorageItem } from "@/utils/browser";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";

export const useLikeComment = ({ commentId }) => {
  const { auth } = useAuth();
  const { postId } = useParams();
  const { getAllPostCommentsQueryKey } = useQueryKey();
  const queryClient = useQueryClient();

  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const { likeCommentService } = commentLikesServices();
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
        // console.log("targetPage ==> ",targetPage)
        targetPage.comments[`@${commentId}`].isCmtLikedByUser = "true";
        targetPage.comments[`@${commentId}`].likes =
          parseInt(targetPage.comments[`@${commentId}`].likes) + 1;
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
          "Error occurred in onError callback of useLikeComment hook. ",
          error,
        );
      }
    },
  });

  return {
    likeComment,
    isPending,
    isError,
    error,
  };
};
