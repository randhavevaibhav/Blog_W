import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const {createPostService} = postsServices();
  const {getAllUserPostsQueryKey,getUserInfoQueryKey,getUserStatQueryKey,getAllTaggedPostsQueryKey} = useQueryKey()
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.userId;


  const {
    mutate: createPost,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data)=>{
      return createPostService({
        ...data
      })
    },
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
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: getAllUserPostsQueryKey({
          userId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey({
          userId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getUserStatQueryKey({
            userId
          }).queryKey,
      });
       queryClient.invalidateQueries({
        queryKey: getAllTaggedPostsQueryKey().queryKey,
      });
    },
  });

  return {
    createPost,
    isPending,
    isError,
  };
};
