import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { userId, postId } = useParams();
  const { auth } = useAuth();

  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

  const createCommentService = async (formData) => {
    const res = await axiosPrivate.post(`/comment`, formData);

    const resData = await res.data;
    return resData;
  };

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onMutate: (data) => {
      // console.log("data ==> ",data)
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) + 1;

      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },
    onSuccess: (res) => {
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);
      const clonedCachedData = _.cloneDeep(cachedData);
      const newComment = {
        ...res.comment,
        userName: auth.userName,
        userProfileImg: auth.userProfileImg,
        replies: [],
      };

      const updateComment = (commentsArr, newComment) => {
        // console.log("commentsArr ==> ", commentsArr);
        commentsArr.forEach((comment) => {
          // console.log("newComment.parentId ===> ", newComment.parentId);
          // console.log("comment.id ===> ", comment.id);
          if (Number(comment.id) === Number(newComment.parentId)) {
            // console.log("found match");
            comment.replies.unshift(newComment);
            return comment;
          } else if (comment.replies.length > 0) {
            return updateComment(comment.replies, newComment);
          }
          return comment;
        });

        return commentsArr;
      };

      if (newComment.parentId) {
        // console.log("newComment ===> ", newComment);
        const updatedComments = updateComment(
          clonedCachedData.postData.comments,
          newComment
        );
        // console.log("newComment ===> ", updatedComments);
        clonedCachedData.postData.comments = updatedComments;
      } else {
        clonedCachedData.postData.comments.push(newComment);
      }

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      //  console.log("comment onSuccess updatedCacheData ==>", clonedCachedData);
      toast.success(`Success !! comment submitted.`);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });

        queryClient.invalidateQueries({
          queryKey: ["getUserInfo", currentUserId.toString()],
        });
      }
    },
  });

  return {
    createComment,
    isPending,
  };
};
