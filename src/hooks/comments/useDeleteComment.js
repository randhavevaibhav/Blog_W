import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, postId } = useParams();

  const currentUserId = auth.userId;

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
    onSuccess: (res) => {
      toast.success(`Success !! comment deleted.`);
    },
    onError: (err) => {
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
        queryKey: [
          "getIndiviualPost",
          currentUserId.toString(),
          userId.toString(),
          postId.toString(),
        ],
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
