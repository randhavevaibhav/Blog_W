import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, postId } = useParams();
  const navigate = useNavigate();

  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

  const deleteCommentService = async (data) => {
    const res = await axiosPrivate.post(`comment/delete`, {
      ...data,
      userId: currentUserId,
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const {
    mutate: deleteComment,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: deleteCommentService,
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
      }
    },
  });

  return {
    deleteComment,
    isPending,
    isError,
    isSuccess,
  };
};
