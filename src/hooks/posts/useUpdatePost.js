import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.userId;


  const updatePostService = async (formData) => {
    const res = await axiosPrivate.patch(`/edit`, formData);

    const resData = await res.data;
    return resData;
  };

  const { mutate: updatePost, isPending } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostService,
    onSuccess: (res) => {
      toast.success(`post edited successfully !!`);

      //navigate to edited post
      setTimeout(() => {
        navigate(`/posts/${res.postId}/${userId}`);
      }, 1500);

  
    
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
  });

  return {
    updatePost,
    isPending,
  };
};
