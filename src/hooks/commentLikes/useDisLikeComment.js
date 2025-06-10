import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
export const useDisLikeComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  const dislikeCommentService = async ({ commentId }) => {
    const res = await axiosPrivate.post(`/comment/dislike`, {
      userId: currentUserId,
      commentId,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: disLikeComment,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: dislikeCommentService,
    onMutate: (data) => {
    const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);
         const clonedCachedData = _.cloneDeep(cachedData);
   
         const updateComment = (commentArr, commentId) => {
           // console.log("commentArr ==> ",commentArr)
   
           return commentArr.map((comment) => {
             if (comment.id === commentId) {
               // console.log("found match ==> ",comment.id,commentId);
               // console.log("found match ==> ",comment)
               comment.likes = `${Number(comment.likes) - 1}`;
               comment.isCmtLikedByUser =false;
               return comment;
             } else if (comment.replies.length > 0) {
               updateComment(comment.replies,commentId);
             }
             return comment;
           });
         };
   
         clonedCachedData.postData.comments = updateComment(
           clonedCachedData.postData.comments,
           data.commentId
         );
   
         queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);
   
         return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
    

      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);

      const responseError = err.response.data?.message;

      console.log("responseError =====> ", responseError);
      console.log("responseError =====> ", err);
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: (res) => {
     
    },
  });

  return {
    disLikeComment,
    isPending,
    isError,
    error,
  };
};
