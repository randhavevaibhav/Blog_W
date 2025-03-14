import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
 
  const {userId,postId} = useParams();

  // console.log("postId in update ===>" ,postId);
 


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
    onSettled:()=>{
      clearLocalPostData();
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", userId.toString()],
      })
      queryClient.invalidateQueries({
        queryKey: ["getIndiviualPost", userId.toString(), postId.toString()],
      });

      // navigate(`/dashboard`);
    }
  });

  return {
    updatePost,
    isPending,
  };
};
