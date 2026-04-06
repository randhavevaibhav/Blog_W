import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";

export const useDeleteNPosts = () => {
  const { deleteNPostsService } = postsServices();
  const {
    getAllUserPostsQueryKey,
    getUserInfoQueryKey,
    getAllTaggedPostsQueryKey,
  } = useQueryKey();
  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();


  const {
    isPending,
    isSuccess,
    data,
    error,
    isError,
    mutate: deleteNPosts,
  } = useMutation({
    mutationKey: ["deleteNPosts"],
    mutationFn: (data) => {
      return deleteNPostsService({
        ...data,
      });
    },
    onSuccess: catchQueryError((res) => {
      toast.success(`posts deleted successfully !`);
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
         queryKey: getAllUserPostsQueryKey().queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getAllTaggedPostsQueryKey().queryKey,
      });
    }),
  });

  return { deleteNPosts, isPending, data, error, isError, isSuccess };
};
