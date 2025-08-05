import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import {cloneDeep} from "lodash-es";
import { postLikesServices } from "@/services/postLikes/postLikesServices";
import { useQueryKey } from "../utils/useQueryKey";
export const useDisLikePost = () => {
  const queryClient = useQueryClient();
  const { dislikePostService } = postLikesServices();
  const {
    getAllUserPostsQueryKey,
    getUserStatQueryKey,
    getPostAnalyticsQueryKey,
  } = useQueryKey();
  const { userId, postId } = useParams();
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
        userId: currentUserId,
        postId,
      });
    },
    onMutate: () => {
      const cachedData = queryClient.getQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey
      );

      const clonedCachedData = cloneDeep(cachedData);

      clonedCachedData.postAnalytics.totalLikes =
        Number(clonedCachedData.postAnalytics.totalLikes) - 1;
      clonedCachedData.postAnalytics.postLikedByUser = false;
      //  console.log("Like mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey,
        clonedCachedData
      );

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      //If post fails rollback optimistic updates to previous state

      // console.log("context in dislike ==> ",context)

      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey,
        context.prevData
      );

      // const cachedData =  queryClient.getQueryData(getPostAnalyticsQueryKey);

      // console.log("cachedData in dislike ==> ",cachedData)

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("responseError =====> ", err);
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    },
    onSettled: (res) => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllUserPostsQueryKey({
            userId,
          }).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: getUserStatQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
      }
    },
  });

  return {
    disLikePost,
    isPending,
    isError,
    error,
  };
};
