import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getDashboardPageLink } from "@/utils/getLinks";
import { catchQueryError } from "../utils/catchQueryError";

export const useDeletePost = () => {
  const { deletePostService } = postsServices();
  const {
    getAllUserPostsQueryKey,
    getUserInfoQueryKey,
    getAllTaggedPostsQueryKey,
  } = useQueryKey();
  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    data,
    error,
    isError,
    mutate: deletePost,
  } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (data) => {
      return deletePostService({
        ...data,
        userId,
      });
    },
    onSuccess: catchQueryError((res) => {
      toast.success(`post deleted successfully !`);
    }),
    onError: catchQueryError((err, variables, context) => {
      // queryClient.setQueryData(getAllOwnPostsQuerKey, context.prevData);
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    }),
    onSettled: catchQueryError(() => {
      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey({
          userId,
        }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getAllUserPostsQueryKey({
          userId,
          sortBy: "desc",
        }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getAllTaggedPostsQueryKey().queryKey,
      });
      navigate(getDashboardPageLink(), { replace: true });
    }),
  });

  return { deletePost, isPending, data, error, isError, isSuccess };
};
