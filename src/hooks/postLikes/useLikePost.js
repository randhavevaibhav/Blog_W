import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { cloneDeep } from "lodash-es";
import { postLikesServices } from "@/services/postLikes/postLikesServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useLikePost = ({ userId }) => {
  const queryClient = useQueryClient();
  const { likePostService } = postLikesServices();
  const {
    getAllUserPostsQueryKey,
    getUserInfoQueryKey,
    getIndividualPostQueryKey,
  } = useQueryKey();
  const { postId } = useParams();
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
        postId,
      });
    },
    onMutate: () => {
      try {
        const cachedData = queryClient.getQueryData(
          getIndividualPostQueryKey({
            postId,
          }).queryKey
        );

        const clonedCachedData = cloneDeep(cachedData);

        clonedCachedData.postData.likes =
          Number(clonedCachedData.postData.likes) + 1;

        clonedCachedData.postData.isLikedByUser = true;
        // console.log("Like mutation updatedCacheData ==>", clonedCachedData);

        queryClient.setQueryData(
          getIndividualPostQueryKey({
            postId,
          }).queryKey,
          clonedCachedData
        );

        return { prevData: cachedData, newData: clonedCachedData };
      } catch (error) {
        console.log(`Error while liking a post ==> `, error);
      }
    },

    onError: (err, variables, context) => {
      console.log("context.prevData ==> ", context);
      console.log("err =====> ", err);
      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        context.prevData
      );

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);

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
          queryKey: getUserInfoQueryKey({
            userId: currentUserId,
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
