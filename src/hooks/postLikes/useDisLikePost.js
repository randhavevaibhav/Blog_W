import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { cloneDeep } from "lodash-es";
import { postLikesServices } from "@/services/postLikes/postLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";
export const useDisLikePost = ({ userId }) => {
  const queryClient = useQueryClient();
  const { dislikePostService } = postLikesServices();
  const {
    getAllUserPostsQueryKey,
    getUserInfoQueryKey,
    getIndividualPostQueryKey,
  } = useQueryKey();
  const { postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;
  const {
    mutate: disLikePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return dislikePostService({
        postId,
      });
    },
    onMutate: catchQueryError(() => {
      const cachedData = queryClient.getQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
      );

      const clonedCachedData = cloneDeep(cachedData);

      clonedCachedData.postData.likes =
        Number(clonedCachedData.postData.likes) - 1;
      clonedCachedData.postData.isLikedByUser = false;
      // console.log("disLike mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        clonedCachedData,
      );

      return { prevData: cachedData, newData: clonedCachedData };
    }),

    onError: catchQueryError((err, variables, context) => {
      //If post fails rollback optimistic updates to previous state
      console.log("responseError =====> ", err);
      console.log("context in dislike ==> ", context);

      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        context.prevData,
      );

      // const cachedData =  queryClient.getQueryData(getIndividualPostQueryKey);

      // console.log("cachedData in dislike ==> ",cachedData)

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);

      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    }),
    onSettled: catchQueryError((res) => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllUserPostsQueryKey({
            userId,
          }).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: getUserInfoQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
      }
    }),
  });

  return {
    disLikePost,
    isPending,
    isError,
    error,
  };
};
