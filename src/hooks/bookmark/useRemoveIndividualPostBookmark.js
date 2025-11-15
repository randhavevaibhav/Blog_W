import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cloneDeep } from "lodash-es";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useRemoveIndividualPostBookmark = ({
  userId,
  currentUserId,
  postId,
}) => {
  const queryClient = useQueryClient();

  const { removeBookmarkService } = bookmarkServices();
  const { getAllBookmarksQueryKey, getPostAnalyticsQueryKey } = useQueryKey();

  const updateIndividualPost = () => {
    const cachedIndPostData = queryClient.getQueryData(
      getPostAnalyticsQueryKey({
        userId,
        postId,
      }).queryKey
    );
    const clonedCachedIndPostData = cloneDeep(cachedIndPostData);
    // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

    clonedCachedIndPostData.postAnalytics.postBookmarked = false;

    // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(
      getPostAnalyticsQueryKey({
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
      try {
        const individualPostUpdatedData = updateIndividualPost();

        return {
          prevData: individualPostUpdatedData.prevData,
          newData: individualPostUpdatedData.newData,
        };
      } catch (error) {
        console.log(
          `Error while removing individual post page bookmark ==> `,
          error
        );
      }
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey,
        context.prevData
      );

      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
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
