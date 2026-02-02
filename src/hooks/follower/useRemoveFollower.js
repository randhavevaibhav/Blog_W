import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cloneDeep } from "lodash-es";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";

export const useRemoveFollower = ({ followingUserId, currentUserId }) => {
  const queryClient = useQueryClient();
  const { removeFollowerService } = followerServices();
  const {
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getUserInfoQueryKey,
  } = useQueryKey();

  const {
    mutate: removeFollower,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return removeFollowerService({
        currentUserId,
        followingUserId,
      });
    },

    onMutate: () => {
      try {
        const updateFollowingUserData = () => {
          const cachedData = queryClient.getQueryData(
            getUserInfoQueryKey({ userId: followingUserId }).queryKey
          );
          const clonedCachedData = cloneDeep(cachedData);
          const userInfo = clonedCachedData?.userInfo;
          const totalUserFollowers = parseInt(userInfo.totalUserFollowers);

          const isFollowed = userInfo.isFollowed;

          if (isFollowed) {
            clonedCachedData.userInfo.isFollowed = false;
            clonedCachedData.userInfo.totalUserFollowers =
              totalUserFollowers - 1;
          }

          queryClient.setQueryData(
            getUserInfoQueryKey({
              userId: followingUserId,
            }).queryKey,
            clonedCachedData
          );

          return { prevData: cachedData, newData: clonedCachedData };
        };

        const updateCurrentUserData = () => {
          const cachedData = queryClient.getQueryData(
            getUserInfoQueryKey({ userId: currentUserId }).queryKey
          );
          const clonedCachedData = cloneDeep(cachedData);
          const userInfo = clonedCachedData?.userInfo;
          const totalUserFollowings = parseInt(userInfo.totalUserFollowings);

          clonedCachedData.userInfo.totalUserFollowings =
            totalUserFollowings - 1;

          queryClient.setQueryData(
            getUserInfoQueryKey({
              userId: currentUserId,
            }).queryKey,
            clonedCachedData
          );

          return { prevData: cachedData, newData: clonedCachedData };
        };

        const optimisticFollowingUserUpdatedData = updateFollowingUserData();
        const optimisticCurrentUserUpdatedData = updateCurrentUserData();

        return {
          prevData: {
            followingUserPrevData: optimisticFollowingUserUpdatedData.prevData,
            currentUserPrevData: optimisticCurrentUserUpdatedData.prevData,
          },
          newData: {
            followingUserNewData: optimisticFollowingUserUpdatedData.newData,
            currentUserNewData: optimisticCurrentUserUpdatedData.newData,
          },
        };
      } catch (error) {
        console.log(`Error while removing a follower ==> `, error);
      }
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: followingUserId,
        }).queryKey,
        context.prevData.followingUserPrevData
      );

      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: currentUserId,
        }).queryKey,
        context.prevData.currentUserPrevData
      );
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getAllFollowingsQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllFollowersQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllFollowingUsersPostsQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
    },
  });

  return {
    removeFollower,
    isPending,
    isError,
    error,
  };
};
