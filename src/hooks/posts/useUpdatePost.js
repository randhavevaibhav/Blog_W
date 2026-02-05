import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getDashboardPageLink } from "@/utils/getLinks";
import { catchQueryError } from "../utils/catchQueryError";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { updatePostService } = postsServices();
  const {
    getIndividualPostQueryKey,
    getAllUserPostsQueryKey,
    getUserInfoQueryKey,
  } = useQueryKey();
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
    onSuccess:catchQueryError( (res) => {
      toast.success(`post edited successfully !!`);

      //navigate to dashboard
      navigate(getDashboardPageLink(), { replace: true });
    }),
    onError: catchQueryError((err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    }),
    onSettled:catchQueryError( () => {
      clearLocalPostData();
      queryClient.invalidateQueries({
        queryKey: getIndividualPostQueryKey({
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

    }),
  });

  return {
    updatePost,
    isPending,
    isError,
    error,
  };
};
