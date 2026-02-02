import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { getPostPageLink } from "@/utils/getLinks";

export const useDeleteComment = ({ hasReplies, commentId }) => {
  const queryClient = useQueryClient();
  const { deleteCommentService } = commentsServices();
  const {
    getAllPostCommentsQueryKey,
    getPostAnalyticsQueryKey,
    getUserInfoQueryKey,
    getAllUserPostsQueryKey,
  } = useQueryKey();
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const navigate = useNavigate();

  const currentUserId = auth.userId;

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
    onMutate: (data) => {
      try {
        // console.log("data ==> ",data)
        const cachedData = queryClient.getQueryData(
          getPostAnalyticsQueryKey({
            postId,
          }).queryKey
        );

        const clonedCachedData = cloneDeep(cachedData);

        clonedCachedData.postAnalytics.totalComments =
          Number(clonedCachedData.postAnalytics.totalComments) - 1;

        // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

        queryClient.setQueryData(
          getPostAnalyticsQueryKey({
            postId,
          }).queryKey,
          clonedCachedData
        );

        return { prevData: cachedData, newData: clonedCachedData };
      } catch (error) {
        console.log(`Error while deleting a comment ==> `, error);
      }
    },
    onSuccess: (res) => {
      toast.success(`Success !! comment deleted.`);
      navigate(`${getPostPageLink({
        postId
      })}#comments`, { replace: true });
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          postId,
        }).queryKey,
        context.prevData
      );
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        console.log("responseError ===> ", err);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllUserPostsQueryKey({
            userId: currentUserId,
          }).queryKey,
        });

        queryClient.invalidateQueries({
          queryKey: getPostAnalyticsQueryKey({
            userId,
            postId,
          }).queryKey,
        });

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
      }
    },
  });

  return {
    deleteComment,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
