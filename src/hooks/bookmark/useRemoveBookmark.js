import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import _ from "lodash";

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  const { userId, postId } = useParams();

  const currentUserId = auth.userId;
  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  const removeBookmarkService = async () => {
    const res = await axiosPrivate.delete(
      `/bookmarks/${currentUserId}/${postId}`
    );

    const resData = await res.data;
    return resData;
  };

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: removeBookmarkService,

    onMutate: () => {
      const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

      const clonedCachedData = _.cloneDeep(cachedData);

      clonedCachedData.postData.postBookmarked = false;

      // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

      return { prevData: cachedData, newData: clonedCachedData };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(getIndiviualPostQueryKey, context.prevData);
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
        //console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllBookmarks", currentUserId.toString()],
      });
    },
  });

  return {
    removeBookmark,
    isPending,
  };
};
