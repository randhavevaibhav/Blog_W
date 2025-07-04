import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import _ from "lodash";
import { followerServices } from "@/services/follower/followerService";

export const useRemoveFollower = ({ followingUserId, currentUserId }) => {
  const queryClient = useQueryClient();
  const { removefollowerService } = followerServices();
  const getFollowingUserInfoQueryKey = [
    "getUserInfo",
    followingUserId.toString(),
  ];
  const getCurrentUserInfoQueryKey = ["getUserInfo", currentUserId.toString()];

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
        queryKey: getFollowingUserInfoQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getCurrentUserInfoQueryKey,
      });
   
      queryClient.invalidateQueries({
        queryKey: ["getAllFollowings", currentUserId.toString()],
      });
         queryClient.invalidateQueries({
        queryKey:["getAllFollowers", currentUserId.toString()]
      })
        queryClient.invalidateQueries({
        queryKey:["getUserStat", currentUserId.toString()]
      })
    },
  });

  return {
    removeFollower,
    isPending,
  };
};
