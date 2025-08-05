import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {cloneDeep} from "lodash-es";
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
    getUserStatQueryKey,
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
      const cachedData = queryClient.getQueryData(
        getUserInfoQueryKey({ userId: followingUserId }).queryKey
      );
      const clonedCachedData = cloneDeep(cachedData);
      const userInfo = clonedCachedData?.userInfo;
      const isFollowed = userInfo.isFollowed;

      if (isFollowed) {
        clonedCachedData.userInfo.isFollowed = false;
      }

      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: followingUserId,
        }).queryKey,
        clonedCachedData
      );

     
      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getUserInfoQueryKey({
          userId: followingUserId,
        }).queryKey,
        context.prevData
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
        queryKey: getUserInfoQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey({
          userId: followingUserId,
        }).queryKey,
      });

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
        queryKey: getUserStatQueryKey({
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
