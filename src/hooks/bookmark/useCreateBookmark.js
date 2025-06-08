import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import _ from "lodash";

export const useCreateBookmark = () => {
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

  const createBookmarkService = async () => {
    const res = await axiosPrivate.post("/bookmarks", {
      userId: currentUserId,
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const { mutate: createBookmark, isPending } = useMutation({
    mutationFn: createBookmarkService,

    onMutate: () => {
      const cachedIndPostData = queryClient.getQueryData(
        getIndiviualPostQueryKey
      );
      const clonedCachedIndPostData = _.cloneDeep(cachedIndPostData);
      // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

      clonedCachedIndPostData.postData.postBookmarked = true;

      // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

      queryClient.setQueryData(
        getIndiviualPostQueryKey,
        clonedCachedIndPostData
      );

      return { prevData: cachedIndPostData, newData: clonedCachedIndPostData };
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
    createBookmark,
    isPending,
  };
};
