import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";

export const useLikeComment = () => {
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

  const likeCommentService = async ({ createdAt, commentId }) => {
    const res = await axiosPrivate.post(`/comment/like`, {
      userId: currentUserId,
      commentId,
      createdAt,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: likeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: likeCommentService,
    onMutate: () => {
      // const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);
      // const clonedCachedData = _.cloneDeep(cachedData);
      // clonedCachedData.postData.totalLikes =
      //   Number(clonedCachedData.postData.totalLikes) + 1;
      // clonedCachedData.postData.likedByUser = true;
      // // console.log("Like mutation updatedCacheData ==>", clonedCachedData);
      // queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);
      // return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      // console.log("context.prevData ==> ", context);

      // queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("err =====> ", err);

      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: (res) => {},
  });

  return {
    likeComment,
    isPending,
    isError,
    error,
  };
};
