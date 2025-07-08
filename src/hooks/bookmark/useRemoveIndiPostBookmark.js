import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import _ from "lodash";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useRemoveIndiPostBookmark = ({
  userId,
  currentUserId,
  postId,
}) => {
  const queryClient = useQueryClient();

  const { removeBookmarkService } = bookmarkServices();
  const { getAllBookmarksQueryKey, getIndiviualPostQueryKey } = useQueryKey();

  const updateIndiviualPost = () => {
    const cachedIndPostData = queryClient.getQueryData(
      getIndiviualPostQueryKey({
        userId,
        postId,
      }).queryKey
    );
    const clonedCachedIndPostData = _.cloneDeep(cachedIndPostData);
    // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

    clonedCachedIndPostData.postData.postBookmarked = false;

    // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(
      getIndiviualPostQueryKey({
        userId,
        postId,
      }).queryKey,
      clonedCachedIndPostData
    );
    return {
      prevData: cachedIndPostData,
      newData: clonedCachedIndPostData,
    };
  };

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return removeBookmarkService({
        userId: currentUserId,
        postId,
      });
    },

    onMutate: () => {
      const indiviualPostUpdatedData = updateIndiviualPost();

      return {
        prevData: indiviualPostUpdatedData.prevData,
        newData: indiviualPostUpdatedData.newData,
      };
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
        //console.log(err);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllBookmarksQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
      }
    },
  });

  return {
    removeBookmark,
    isPending,
  };
};
