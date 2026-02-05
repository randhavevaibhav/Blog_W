import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getLocalStorageItem } from "@/utils/browser";
import { cloneDeep } from "lodash-es";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { catchQueryError } from "../utils/catchQueryError";

export const useDisLikeComment = ({ commentId }) => {
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { getAllPostCommentsQueryKey } = useQueryKey();

  const { dislikeCommentService } = commentLikesServices();
  const sortCmtBy = getLocalStorageItem("sortCmt")
    ? getLocalStorageItem("sortCmt")
    : "desc";

  const {
    mutate: disLikeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return dislikeCommentService({
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
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
