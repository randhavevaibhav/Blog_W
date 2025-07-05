import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
import { postLikesServices } from "@/services/postLikes/postLikesServices";
export const useDisLikePost = () => {
  const queryClient = useQueryClient();
  const { dislikePostService } = postLikesServices();
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];
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
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalLikes =
        Number(clonedCachedData.postData.totalLikes) - 1;
      clonedCachedData.postData.postlikedByUser = false;
      //  console.log("Like mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      //If post fails rollback optimistic updates to previous state

      // console.log("context in dislike ==> ",context)

      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

      // const cachedData =  queryClient.getQueryData(getIndiviualPostQueryKey);

      // console.log("cachedData in dislike ==> ",cachedData)

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("responseError =====> ", err);
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: (res) => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ["getUserStat", currentUserId.toString()],
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
