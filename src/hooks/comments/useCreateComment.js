import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import {  useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const {postId}  =useParams();
  const {auth} =useAuth();

  const currentUserId = auth.userId;

  

  const createCommentService = async (formData) => {
    const res = await axiosPrivate.post(`comment/${currentUserId}/${postId}`, formData);

    const resData = await res.data;
    return resData;
  };

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onSuccess: (res) => {
      
      toast.success(`Success !! comment submitted.`);

    },
    onError: (err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
       
      }
    },
    onSettled:()=>{
      queryClient.invalidateQueries({
        queryKey: ["getAllPostComments", currentUserId.toString(),postId.toString()],
        
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", currentUserId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllPostsFeed"]
      });
    }
  });

  return {
    createComment,
    isPending,
  };
};
