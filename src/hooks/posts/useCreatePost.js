import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.userId;

  const createPostService = async (formData) => {
    const res = await axiosPrivate.post("/post", formData);

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: createPost,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostService,
    onSuccess: (res) => {
      toast.success(`Success !! created new post`);
      clearLocalPostData();
      //navigate to dashboard

      navigate(`/dashboard`);
    },
    onError: (err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
        //console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserStat", userId.toString()],
      });
    },
  });

  return {
    createPost,
    isPending,
    isError,
  };
};
