import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getLocalStorageItem } from "@/utils/browser";
import { useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import toast from "react-hot-toast";
import { catchQueryError } from "../utils/catchQueryError";

export const useLikeComment = ({ commentId }) => {
  const { postId } = useParams();
  const { getAllPostCommentsQueryKey } = useQueryKey();
  const queryClient = useQueryClient();

  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const { likeCommentService } = commentLikesServices();

  const {
    mutate: likeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return likeCommentService({
        commentId,
      });
    },
    onMutate: catchQueryError((data) => {

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
      
    }),
    onError: catchQueryError((err, variables, context) => {
      
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
    }),
  });

  return {
    likeComment,
    isPending,
    isError,
    error,
  };
};
