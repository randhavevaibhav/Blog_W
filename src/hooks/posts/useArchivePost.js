import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

import { catchQueryError } from "../utils/catchQueryError";

export const useArchivePost = () => {
  const queryClient = useQueryClient();
  const { archivePostService } = postsServices();
  const {
    getAllUserPostsQueryKey,
  } = useQueryKey();



  const {
    mutate: archivePost,
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
  
     
      queryClient.invalidateQueries({
        queryKey: getAllUserPostsQueryKey().queryKey,
      });
    }),
  });

  return {
    archivePost,
    isPending,
    isError,
    error,
  };
};
