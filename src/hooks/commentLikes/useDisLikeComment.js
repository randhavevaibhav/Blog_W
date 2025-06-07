import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
export const useDisLikeComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  const dislikeCommentService = async ({ commentId }) => {
    const res = await axiosPrivate.post(`/comment/dislike`, {
      userId: currentUserId,
      commentId,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: disLikeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: dislikeCommentService,
    // onMutate: () => {
    //   const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

    //   const clonedCachedData = _.cloneDeep(cachedData);

    //   clonedCachedData.postData.totalLikes =
    //     Number(clonedCachedData.postData.totalLikes) - 1;
    //   clonedCachedData.postData.likedByUser = false;
    //   //  console.log("Like mutation updatedCacheData ==>", clonedCachedData);

    //   queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

    //   return { prevData: cachedData, newData: clonedCachedData };
    // },

    onError: (err, variables, context) => {
      //If post fails rollback optimistic updates to previous state

      // console.log("context in dislike ==> ",context)

      // queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

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
    onSettled: (res) => {},
  });

  return {
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
