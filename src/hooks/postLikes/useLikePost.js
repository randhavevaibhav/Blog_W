import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

  const likePostService = async ({ createdAt }) => {
    const res = await axiosPrivate.post(`/post/like`, {
      userId: currentUserId,
      postId,
      createdAt,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: likePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: likePostService,
    onMutate: () => {
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalLikes =
        Number(clonedCachedData.postData.totalLikes) + 1;

      clonedCachedData.postData.postlikedByUser = true;
      // console.log("Like mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      // console.log("context.prevData ==> ", context);

      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("err =====> ", err);

      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: (res) => {
      if(currentUserId){
  queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", currentUserId.toString()],
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
