import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useDeleteComment = ({ hasReplies, commentId }) => {
  const queryClient = useQueryClient();
  const { deleteCommentService } = commentsServices();
  const {
    getAllPostCommentsQueryKey,
    getIndiviualPostQueryKey,
    getUserInfoQueryKey,
    getUserStatQueryKey,
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
        userId: currentUserId,
        postId,
        hasReplies,
        commentId,
      });
    },
    onMutate: (data) => {
      // console.log("data ==> ",data)
      const cachedData = queryClient.getQueryData(
        getIndiviualPostQueryKey({
          userId,
          postId,
        }).queryKey
      );

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) - 1;

      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(
        getIndiviualPostQueryKey({
          userId,
          postId,
        }).queryKey,
        clonedCachedData
      );

      return { prevData: cachedData, newData: clonedCachedData };
    },
    onSuccess: (res) => {
      toast.success(`Success !! comment deleted.`);
      navigate(-1);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getIndiviualPostQueryKey({
          userId,
          postId,
        }).queryKey,
        context.prevData
      );
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
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
          queryKey: getIndiviualPostQueryKey({
            userId,
            postId,
          }).queryKey,
        });

        queryClient.invalidateQueries({
          queryKey: getAllPostCommentsQueryKey({
            userId,
            postId,
          }).queryKey,
        });

        queryClient.invalidateQueries({
          queryKey: getUserInfoQueryKey({
            userId: currentUserId,
          }).queryKey,
        });

        queryClient.invalidateQueries({
          queryKey: getUserStatQueryKey({
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
