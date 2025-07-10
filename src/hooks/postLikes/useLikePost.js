import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
import { postLikesServices } from "@/services/postLikes/postLikesServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { likePostService } = postLikesServices();
  const {getIndividualPostQueryKey,getAllUserPostsQueryKey,getUserStatQueryKey} = useQueryKey()
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

 

  const {
    mutate: likePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: () => {
      return likePostService({
        userId: currentUserId,
        postId,
        createdAt: new Date(),
      });
    },
    onMutate: () => {
      const cachedData = queryClient.getQueryData(getIndividualPostQueryKey({
          userId,
          postId,
        }).queryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalLikes =
        Number(clonedCachedData.postData.totalLikes) + 1;

      clonedCachedData.postData.postLikedByUser = true;
      // console.log("Like mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndividualPostQueryKey({
          userId,
          postId,
        }).queryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      // console.log("context.prevData ==> ", context);

      queryClient.setQueryData(getIndividualPostQueryKey({
          userId,
          postId,
        }).queryKey, context.prevData);

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("err =====> ", err);

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
            userId
          }).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: getUserStatQueryKey({
            userId:currentUserId
          }).queryKey,
        });
      }
    },
  });

  return {
    likePost,
    isPending,
    isError,
    error,
  };
};
