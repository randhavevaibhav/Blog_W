import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const {updatePostService} = postsServices();
  const navigate = useNavigate();

  const { userId, postId } = useParams();

  const { auth } = useAuth();
  const currentUserId = auth.userId;


  const {
    mutate: updatePost,
    isPending,
    isError,
  } = useMutation({
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
    onSettled: () => {
      clearLocalPostData();
      queryClient.invalidateQueries({
        queryKey: [
          "getIndiviualPost",
          userId.toString(),
          postId.toString(),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", currentUserId.toString()]
      });
    
      // navigate(`/dashboard`);
    },
  });

  return {
    updatePost,
    isPending,
    isError,
  };
};
