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
    const res = await axiosPrivate.delete(`/deletepost/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const {
    isPending,
    data,
    error,
    isError,
    mutate: deletePost,
  } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostService,
    onSuccess: (res) => {
      toast.success(`post deleted successfully !`);

      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", userId],
      });
    },
    onError: (err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
  });

  return { deletePost, isPending, data, error, isError };
};
