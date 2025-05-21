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
    currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  // console.log("auth ===> ",auth)

  const createCommentService = async (formData) => {
    const res = await axiosPrivate.post(
      `comment/${currentUserId}/${postId}`,
      formData
    );

    const resData = await res.data;
    return resData;
  };

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onMutate: (data) => {
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);
      // console.log(
      //   "create comt mutation clonedCachedData ==>",
      //   clonedCachedData
      // );

      const newComment = {
        content: data.content,
        created_at: data.createdAt,
        userId: auth.userId,
        userName: auth.userName,
        userProfileImg: auth.userProfileImg,
      };
      clonedCachedData.postData.comments.push(newComment);
      clonedCachedData.postData.totalComments =
        Number(clonedCachedData.postData.totalComments) + 1;
      // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },
    onSuccess: (res) => {
      // console.log("res ===> ", res);

      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);
      const latestComment = clonedCachedData.postData.comments.pop();

      const updatedComment = { ...latestComment, id: res.commentId };

      clonedCachedData.postData.comments.push(updatedComment);
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
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", currentUserId.toString()],
      });

      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", currentUserId.toString()],
      });
    },
  });

  return {
    createComment,
    isPending,
  };
};
