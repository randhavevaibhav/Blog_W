import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useUpdateComment = ({ postId, postUserId }) => {
  const navigate = useNavigate();
  const { updateCommentService } = commentsServices();
  const queryClient = useQueryClient();
  const { getAllPostCommentsQueryKey } = useQueryKey();

  const {
    mutate: updateComment,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateCommentService,
    onSuccess: (res) => {
      toast.success(`comment edited successfully !!`);
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
      navigate(`/post/${postUserId}/${postId}#comments`,{replace:true});
      queryClient.invalidateQueries({
        queryKey: getAllPostCommentsQueryKey({
          postId,
        }).queryKey,
      });
    },
  });

  return {
    updateComment,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
