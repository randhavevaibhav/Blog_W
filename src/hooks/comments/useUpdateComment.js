import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getPostPageLink } from "@/utils/getLinks";
import { catchQueryError } from "../utils/catchQueryError";

export const useUpdateComment = ({ postId }) => {
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
    onSuccess: catchQueryError((res) => {
      toast.success(`comment edited successfully !!`);
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
      navigate(`${getPostPageLink({
        postId
      })}#comments`, { replace: true });
      queryClient.invalidateQueries({
        queryKey: getAllPostCommentsQueryKey({
          postId,
        }).queryKey,
      });
    }),
  });

  return {
    updateComment,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
