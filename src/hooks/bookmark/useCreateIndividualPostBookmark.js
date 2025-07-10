import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import _ from "lodash";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";
// Individual
export const useCreateIndividualPostBookmark = ({
  userId,
  currentUserId,
  postId,
}) => {
  const queryClient = useQueryClient();

  const { createBookmarkService } = bookmarkServices();
  const {getAllBookmarksQueryKey,getIndividualPostQueryKey} = useQueryKey();

  

  const updateIndividualPost = () => {
    const cachedIndPostData = queryClient.getQueryData(
      getIndividualPostQueryKey({
        userId,
        postId
      }).queryKey
    );
    const clonedCachedIndPostData = _.cloneDeep(cachedIndPostData);
    // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

    clonedCachedIndPostData.postData.postBookmarked = true;

    // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(  getIndividualPostQueryKey({
        userId,
        postId
      }).queryKey, clonedCachedIndPostData);
    return {
      prevData: cachedIndPostData,
      newData: clonedCachedIndPostData,
    };
  };

  const { mutate: createBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return createBookmarkService({
        userId: currentUserId,
        postId,
        createdAt: new Date(),
      });
    },

    onMutate: () => {
      const individualPostUpdatedData = updateIndividualPost();

      return {
        prevData: individualPostUpdatedData.prevData,
        newData: individualPostUpdatedData.newData,
      };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(  getIndividualPostQueryKey({
        userId,
        postId
      }).queryKey, context.prevData);

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
            userId:currentUserId,
          }).queryKey,
        });
      }
    },
  });

  return {
    createBookmark,
    isPending,
  };
};
