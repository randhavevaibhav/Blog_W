import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import _ from "lodash";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";

export const useRemoveFollower = ({ followingUserId, currentUserId }) => {
  const queryClient = useQueryClient();
  const { removefollowerService } = followerServices();
  const {
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getUserInfoQueryKey,
    getUserStatQueryKey
  } = useQueryKey();


  const { mutate: removeFollower, isPending } = useMutation({
    mutationFn: () => {
      return removefollowerService({
        currentUserId,
        followingUserId,
      });
    },

    onMutate: () => {},

    onError: (err, variables, context) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
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
            userId:currentUserId
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
  };
};
