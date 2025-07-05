import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import { commentsServices } from "@/services/comments/commentsServices";

export const useDeleteComment = ({ hasReplies, commentId }) => {
  const queryClient = useQueryClient();
  const { deleteCommentService } = commentsServices();
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const navigate = useNavigate();

  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

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
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) - 1;

      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },
    onSuccess: (res) => {
      toast.success(`Success !! comment deleted.`);
      navigate(-1);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);
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
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: getIndiviualPostQueryKey,
        });

        queryClient.invalidateQueries({
          queryKey: [
            "getAllPostComments",
            postId.toString(),
            userId.toString(),
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["getUserInfo", currentUserId.toString()],
        });

        queryClient.invalidateQueries({
          queryKey: ["getUserStat", currentUserId.toString()],
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
