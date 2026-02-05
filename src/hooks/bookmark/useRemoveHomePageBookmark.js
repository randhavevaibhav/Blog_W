import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cloneDeep } from "lodash-es";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";

const mutationLocationList = {
  Discover: "Discover",
  Following: "Following",
};

export const useRemoveHomePageBookmark = ({
  currentUserId,
  postId,
  mutationLocation,
}) => {
  const queryClient = useQueryClient();

  const { removeBookmarkService } = bookmarkServices();
  const {
    getAllBookmarksQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getAllPostsFeedQueryKey,
    getIndividualPostQueryKey,
  } = useQueryKey();

  const updateHomePage = ({ queryKey, page, postId }) => {
    const cachedData = queryClient.getQueryData(queryKey);
    const clonedCachedData = cloneDeep(cachedData);

    // console.log("old  clonedCachedData ===> ", clonedCachedData);

    const targetPagePost = clonedCachedData.pages[page].posts[`@${postId}`];
    targetPagePost.isBookmarked = false;

    // console.log("updated  clonedCachedData ===> ", clonedCachedData);
    queryClient.setQueryData(queryKey, clonedCachedData);

    return {
      prevData: cachedData,
      newData: clonedCachedData,
    };
  };

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return removeBookmarkService({
        postId,
      });
    },

    onMutate: catchQueryError((data) => {
      const page = data.page;
      switch (mutationLocation) {
        case mutationLocationList["Discover"]:
          const discoverPageUpdatedData = updateHomePage({
            queryKey: getAllPostsFeedQueryKey().queryKey,
            page,
            postId,
          });
          return {
            prevData: {
              homePageUpdateData: discoverPageUpdatedData.prevData,
            },
            newData: {
              homePageUpdateData: discoverPageUpdatedData.newData,
            },
          };
        case mutationLocationList["Following"]:
          const followingUserPostsPageUpdatedData = updateHomePage({
            queryKey: getAllFollowingUsersPostsQueryKey({
              userId: currentUserId,
            }).queryKey,
            page,
            postId,
          });
          return {
            prevData: {
              followingUserPostsPageData:
                followingUserPostsPageUpdatedData.prevData,
            },
            newData: {
              followingUserPostsPageData:
                followingUserPostsPageUpdatedData.newData,
            },
          };
        default:
          return {
            prevData: null,
            newData: null,
          };
      }
    }),

    onError: catchQueryError((err, variables, context) => {
      if (mutationLocation === "Discover") {
        queryClient.setQueryData(
          getAllPostsFeedQueryKey().queryKey,
          context.prevData.homePageUpdateData,
        );
      }
      if (mutationLocation === "Following") {
        queryClient.setQueryData(
          getAllFollowingUsersPostsQueryKey({
            userId: currentUserId,
          }).queryKey,
          context.prevData.followingUserPostsPageData,
        );
      }
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
      queryClient.invalidateQueries({
        queryKey: getIndividualPostQueryKey({
          postId,
        }).queryKey,
      });
    }),
  });

  return {
    removeBookmark,
    isPending,
  };
};
