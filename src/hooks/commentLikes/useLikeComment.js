import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentLikesServices } from "@/services/commentLikes/commentLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { useParams, useSearchParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import toast from "react-hot-toast";
import { catchQueryError } from "../utils/catchQueryError";

export const useLikeComment = ({ commentId }) => {
  const { postId } = useParams();
  const { getAllPostCommentsQueryKey } = useQueryKey();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortCmtBy = searchParams.get("sort")
    ? searchParams.get("sort")
    : "desc";
  const sortCmtByOptions = ["likes", "desc", "asc"];
  const filteredSortCmtByOptions = sortCmtByOptions.filter(
    (val) => val !== sortCmtBy,
  );

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
    onSettled: catchQueryError(() => {
      queryClient.invalidateQueries({
        queryKey: getAllPostCommentsQueryKey({
          postId,
          sortBy: filteredSortCmtByOptions[0],
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllPostCommentsQueryKey({
          postId,
          sortBy: filteredSortCmtByOptions[1],
        }).queryKey,
      });
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
