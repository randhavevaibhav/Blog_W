import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash-es";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";
// Individual
export const useCreateIndividualPostBookmark = ({ currentUserId, postId }) => {
  const queryClient = useQueryClient();

  const { createBookmarkService } = bookmarkServices();
  const { getAllBookmarksQueryKey, getIndividualPostQueryKey } = useQueryKey();

  const updateIndividualPost = () => {
    const cachedIndPostData = queryClient.getQueryData(
      getIndividualPostQueryKey({
        postId,
      }).queryKey,
    );
    const clonedCachedIndPostData = cloneDeep(cachedIndPostData);
    // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

    clonedCachedIndPostData.postData.isBookmarked = true;

    // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(
      getIndividualPostQueryKey({
        postId,
      }).queryKey,
      clonedCachedIndPostData,
    );
    return {
      prevData: cachedIndPostData,
      newData: clonedCachedIndPostData,
    };
  };

  const { mutate: createBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return createBookmarkService({
        postId,
      });
    },

    onMutate: catchQueryError(() => {
      const individualPostUpdatedData = updateIndividualPost();

      return {
        prevData: individualPostUpdatedData.prevData,
        newData: individualPostUpdatedData.newData,
      };
    }),

    onError: catchQueryError((err, variables, context) => {
      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        context.prevData,
      );

      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    }),
    onSettled: catchQueryError(() => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllBookmarksQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
      }
    }),
  });

  return {
    createBookmark,
    isPending,
  };
};
