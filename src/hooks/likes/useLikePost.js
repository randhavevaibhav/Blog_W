import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth.userId;

  const likePostService = async ({ createdAt, likesCount }) => {
    const res = await axiosPrivate.post(`createpostlike/${userId}/${postId}`, {
      createdAt,
    });

    const resData = await res.data;
    return resData;
  };

  const { mutate: likePost, isPending } = useMutation({
    mutationFn: likePostService,
    onMutate: (optimisticMutateVal) => {
      //code for optimistic likes update

      //get query key
      const queryKey = ["getTotalPostLikes", postId];

      //get optimistic value i.e., instant value to be updated
    //   console.log("mutateVal  ====> ", optimisticMutateVal);

      //get the previously fetched value
      const prevData = queryClient.getQueryData(queryKey);
      //overwrite the previously fetched value with optimistic updates
      const newData = {
        ...prevData,
        totalLikes: optimisticMutateVal.likesCount.toString(),
        likedByUser: optimisticMutateVal.likeAction,
      };

      //set current query data to optimistic data

      queryClient.setQueryData(queryKey, newData);

    //   console.log("prevData ========> ", prevData);
    //   console.log("newData ========> ", newData);

      return { prevData, newData };
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["getTotalPostLikes", postId],
      });
    },
    onError: (err, variables, context) => {
      //If post fails rollback optimistic updates to previous state
      const queryKey = ["getTotalPostLikes", postId];
      queryClient.setQueryData(queryKey, context.prevData);

      const responseError = err.response.data?.message;

      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
  });

  return {
    likePost,
    isPending,
  };
};
