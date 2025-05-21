import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import _ from "lodash";
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, postId } = useParams();

  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  const deleteCommentService = async (data) => {
    const res = await axiosPrivate.post(`comment/delete`, {
      ...data,
      userId: currentUserId,
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const { mutate: deleteComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: deleteCommentService,
    onMutate: (data) => {
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);
      // console.log(
      //   "create comt mutation clonedCachedData ==>",
      //   clonedCachedData
      // );

      clonedCachedData.postData.comments.pop();
      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) - 1;
      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },
    onSuccess: (res) => {
      toast.success(`Success !! comment deleted.`);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", currentUserId.toString()],
      });

      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", currentUserId.toString()],
      });
    },
  });

  return {
    deleteComment,
    isPending,
  };
};
