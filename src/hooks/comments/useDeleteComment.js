import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getPostPageLink } from "@/utils/getLinks";
import { catchQueryError } from "../utils/catchQueryError";

export const useDeleteComment = ({ hasReplies, commentId }) => {
  const queryClient = useQueryClient();
  const { deleteCommentService } = commentsServices();
  const {
    getAllPostCommentsQueryKey,
    getUserInfoQueryKey,
    getIndividualPostQueryKey,
    getAllUserPostsQueryKey,
  } = useQueryKey();
  const { auth } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();

  const currentUserId = auth.userId;

  const cachedData = queryClient.getQueryData(
    getIndividualPostQueryKey({
      postId,
    }).queryKey,
  );

  const clonedCachedData = cloneDeep(cachedData);
  const postAuthorId = clonedCachedData.postData.userId;

  const {
    mutate: deleteComment,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: () => {
      return deleteCommentService({
        postId,
        hasReplies,
        commentId,
      });
    },
    onMutate: catchQueryError((data) => {
      // console.log("data ==> ",data)

      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) - 1;

      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        clonedCachedData,
      );

      return { prevData: cachedData, newData: clonedCachedData };
    }),
    onSuccess: catchQueryError((res) => {
      toast.success(`Success !! comment deleted.`);
      navigate(
        `${getPostPageLink({
          postId,
        })}#comments`,
        { replace: true },
      );
    }),
    onError: catchQueryError((err, variables, context) => {
      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        context.prevData,
      );
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        console.log("responseError ===> ", err);
      }
    }),
    onSettled: catchQueryError(() => {
      if (parseInt(currentUserId) === parseInt(postAuthorId)) {
        queryClient.invalidateQueries({
          queryKey: getAllUserPostsQueryKey().queryKey,
        });
      }

      queryClient.invalidateQueries({
        queryKey: getAllPostCommentsQueryKey({
          postId,
        }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryKey({
          userId: currentUserId,
        }).queryKey,
      });
    }),
  });

  return {
    deleteComment,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
