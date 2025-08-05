import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {cloneDeep} from "lodash-es";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";

const mutationLocationList = {
  Discover: "Discover",
  Following: "Following",
};

export const useCreateHomePageBookmark = ({
  currentUserId,
  userId,
  postId,
  mutationLocation,
}) => {
  const queryClient = useQueryClient();

  const { createBookmarkService } = bookmarkServices();

  const {
    getAllBookmarksQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getAllPostsFeedQueryKey,
    getIndividualPostQueryKey
  } = useQueryKey();

  const updateHomePage = ({ queryKey, page }) => {
    const cachedData = queryClient.getQueryData(queryKey);
    const clonedCachedData = cloneDeep(cachedData);

    // console.log("old  clonedCachedData ===> ", clonedCachedData);

    const updatePost = ({ posts }) => {
      // console.log("posts in updatePost ==> ", posts);
      const updatedPost = posts.map((post) => {
        // console.log("post.postId,postId ==> ", post.postId, postId);
        if (parseInt(post.postId) === parseInt(postId)) {
          // console.log("found match !! ==> ", post.postId);
          return {
            ...post,
            isBookmarked: true,
          };
        } else {
          return {
            ...post,
          };
        }
      });
      return updatedPost;
    };

    const targetPagePosts = clonedCachedData.pages[page].posts;
    clonedCachedData.pages[page].posts = updatePost({ posts: targetPagePosts });

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
        userId: currentUserId,
        postId,
        createdAt: new Date(),
      });
    },

    onMutate: (data) => {
      const page = data.page;
      switch (mutationLocation) {
        case mutationLocationList["Discover"]:
          const discoverPageUpdatedData = updateHomePage({
            queryKey: getAllPostsFeedQueryKey().queryKey,
            page,
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
          queryKey: getIndividualPostQueryKey({
            userId,
            postId
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
