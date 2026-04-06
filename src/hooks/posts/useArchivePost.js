import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";
import { useCallback } from "react";

export const useArchivePost = () => {
  const queryClient = useQueryClient();
  const { archivePostService } = postsServices();
  const { getAllUserPostsQueryKey } = useQueryKey();

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["archivePost"],
    mutationFn: archivePostService,
    onSuccess: catchQueryError((res) => {
      //navigate to dashboard
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
    onSettled: catchQueryError(() => {

      //IMP - completely remove user posts query data after archive post mutation
      queryClient.removeQueries({
        queryKey: getAllUserPostsQueryKey().queryKey,
      });
      queryClient.refetchQueries({
        queryKey: getAllUserPostsQueryKey().queryKey,
      });
    }),
  });
const archivePost = useCallback(mutate,[])
  return {
    archivePost,
    isPending,
    isError,
    error,
  };
};
