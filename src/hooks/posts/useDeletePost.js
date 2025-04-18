import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";

export const useDeletePost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();

  const deletePostService = async (postId) => {
    const res = await axiosPrivate.delete(`/post/delete/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const {
    isPending,
    isSuccess,
    data,
    error,
    isError,
    mutate: deletePost,
  } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostService,
    onSuccess: (res) => {
      toast.success(`post deleted successfully !`);
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
        queryKey: ["getAllOwnPosts", userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", userId.toString()],
      });
    },
  });

  return { deletePost, isPending, data, error, isError, isSuccess };
};
