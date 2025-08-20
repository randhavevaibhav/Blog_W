import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { updatePostService } = postsServices();
  const { getIndividualPostQueryKey, getAllUserPostsQueryKey,getUserInfoQueryKey } = useQueryKey();
  const navigate = useNavigate();

  const { userId, postId } = useParams();

  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const {
    mutate: updatePost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostService,
    onSuccess: (res) => {
      toast.success(`post edited successfully !!`);

      //navigate to dashboard
      navigate(`/dashboard`,{replace:true});
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
      clearLocalPostData();
      queryClient.invalidateQueries({
        queryKey: getIndividualPostQueryKey({
          userId,
          postId,
        }).queryKey,
      });
       queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey({
          userId,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAllUserPostsQueryKey({
          userId: currentUserId,
        }).queryKey,
      });

      // navigate(`/dashboard`);
    },
  });

  return {
    updatePost,
    isPending,
    isError,
    error,
  };
};
