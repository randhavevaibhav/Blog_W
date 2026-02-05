import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash-es";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";

export const useCreateFollower = ({ currentUserId, followingUserId }) => {
  const queryClient = useQueryClient();

  const { createFollowerService } = followerServices();

  const {
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getUserInfoQueryKey,
  } = useQueryKey();

  const {
    mutate: createFollower,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return createFollowerService({
        userId: currentUserId,
        followingUserId,
      });
    },

    onMutate: catchQueryError(() => {
      const updateFollowingUserData = () => {
        const cachedData = queryClient.getQueryData(
          getUserInfoQueryKey({ userId: followingUserId }).queryKey,
        );
        const clonedCachedData = cloneDeep(cachedData);
        const userInfo = clonedCachedData?.userInfo;
        const totalUserFollowers = parseInt(userInfo.totalUserFollowers);

        const isFollowed = userInfo.isFollowed;

        if (!isFollowed) {
          clonedCachedData.userInfo.isFollowed = true;
          clonedCachedData.userInfo.totalUserFollowers = totalUserFollowers + 1;
        }

        queryClient.setQueryData(
          getUserInfoQueryKey({
            userId: followingUserId,
          }).queryKey,
          clonedCachedData,
        );

        return { prevData: cachedData, newData: clonedCachedData };
      };

      const updateCurrentUserData = () => {
        const cachedData = queryClient.getQueryData(
          getUserInfoQueryKey({ userId: currentUserId }).queryKey,
        );

        const clonedCachedData = cloneDeep(cachedData);

        const userInfo = clonedCachedData?.userInfo;
        const totalUserFollowings = parseInt(userInfo.totalUserFollowings);

        clonedCachedData.userInfo.totalUserFollowings = totalUserFollowings + 1;

        queryClient.setQueryData(
          getUserInfoQueryKey({
            userId: currentUserId,
          }).queryKey,
          clonedCachedData,
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
    }),

    onError: catchQueryError((err, variables, context) => {
      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: followingUserId,
        }).queryKey,
        context.prevData.followingUserPrevData,
      );

      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: currentUserId,
        }).queryKey,
        context.prevData.currentUserPrevData,
      );
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    }),
    onSettled: catchQueryError(() => {
      queryClient.invalidateQueries({
        queryKey: getAllFollowersQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllFollowingsQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllFollowingUsersPostsQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
    }),
  });

  return {
    createFollower,
    isPending,
    isError,
    error,
  };
};
