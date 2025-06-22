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

  //  const sortCmtBy = "desc"

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
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "getAllPostComments",
            postId.toString(),
            userId.toString(),
          ],
        });
      }
    },
  });

  return {
    createComment,
    isPending,
  };
};
