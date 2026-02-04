import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { cloneDeep } from "lodash-es";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";

const mutationLocationList = {
  Discover: "Discover",
  Following: "Following",
};

export const useCreateHomePageBookmark = ({
  currentUserId,
  postId,
  mutationLocation,
}) => {
  const queryClient = useQueryClient();

  const { createBookmarkService } = bookmarkServices();

  const {
    getAllBookmarksQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getAllPostsFeedQueryKey,
    getPostAnalyticsQueryKey,
  } = useQueryKey();

  const updateHomePage = ({ queryKey, page, postId }) => {
    const cachedData = queryClient.getQueryData(queryKey);
    const clonedCachedData = cloneDeep(cachedData);

    // console.log("old  clonedCachedData ===> ", clonedCachedData);
    // console.log("page ==> ",page)
    const targetPagePost = clonedCachedData.pages[page].posts[`@${postId}`];
    // clonedCachedData.pages[page].posts = updatePost({ posts: targetPagePosts });
    targetPagePost.isBookmarked = true;
    // console.log("updated  clonedCachedData ===> ", clonedCachedData);
    queryClient.setQueryData(queryKey, clonedCachedData);

    return {
      prevData: cachedData,
      newData: clonedCachedData,
    };
  };

  const { mutate: createBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return createBookmarkService({
        postId,
      });
    },

    onMutate: (data) => {
      try {
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
      } catch (error) {
        console.log(`Error while creating Home page bookmark ==>`, error);
      }
    },

    onError: (err, variables, context) => {
      if (mutationLocation === "Discover") {
        queryClient.setQueryData(
          getAllPostsFeedQueryKey().queryKey,
          context.prevData.homePageUpdateData
        );
      }
      if (mutationLocation === "Following") {
        queryClient.setQueryData(
          getAllFollowingUsersPostsQueryKey({
            userId: currentUserId,
          }).queryKey,
          context.prevData.followingUserPostsPageData
        );
      }
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
        queryClient.invalidateQueries({
          queryKey: getPostAnalyticsQueryKey({
            postId,
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
