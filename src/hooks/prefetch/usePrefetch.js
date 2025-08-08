import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { userServices } from "@/services/user/userServices";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";
import { commentsServices } from "@/services/comments/commentsServices";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const {
    getIndividualPostService,
    getAllUserPostsService,
    getAllTaggedPostService,
    getPostAnalyticsService,
  } = postsServices();
  const { getUserStatService } = userServices();
  const { getAllCommentsService } = commentsServices();
  const {
    getAllBookmarksQueryKey,
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getIndividualPostQueryKey,
    getPostAnalyticsQueryKey,
    getAllPostCommentsQueryKey,
    getUserInfoQueryKey,
    getAllUserPostsQueryKey,
    getAllTaggedPostsQueryKey,
    getUserStatQueryKey,
  } = useQueryKey();
  const { getAllBookmarksService } = bookmarkServices();
  const { getUserInfoService } = userServices();
  const { getAllFollowersService, getAllFollowingsService } =
    followerServices();
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;

  const preFetchAllUserPosts = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllUserPostsQueryKey({
        userId: currentUserId,
        sortBy: "desc",
      }).queryKey,
      queryFn: (data) => {
        return getAllUserPostsService({
          ...data,
          userId: currentUserId,
          sortBy: "desc",
        });
      },
    });
  };

  const preFetchBookmarks = async ({ sortBy = "desc" }) => {
    await queryClient.prefetchQuery({
      queryKey: getAllBookmarksQueryKey({
        userId: currentUserId,
        sortBy,
      }).queryKey,
      queryFn: () =>
        getAllBookmarksService({
          userId: currentUserId,
          sortBy,
        }),
    });
  };

  const preFetchUserInfo = async ({ userId }) => {
    await queryClient.prefetchQuery({
      queryKey: getUserInfoQueryKey({
        userId,
      }).queryKey,
      queryFn: () => {
        return getUserInfoService({ userId, currentUserId });
      },
    });
  };

  const preFetchIndividualPost = async ({ userId, postId, imgURL }) => {
    //fetch image
    if (imgURL) {
      const image = new Image();
      image.src = imgURL;
    }
    await queryClient.prefetchQuery({
      queryKey: getIndividualPostQueryKey({
        userId,
        postId,
      }).queryKey,
      queryFn: () => {
        return getIndividualPostService({
          currentUserId,
          postId,
          userId,
        });
      },
    });
  };

  const preFetchPostAnalytics = async ({ userId, postId }) => {
    await queryClient.prefetchQuery({
      queryKey: getPostAnalyticsQueryKey({
        userId,
        postId,
      }).queryKey,
      queryFn: () => {
        return getPostAnalyticsService({
          currentUserId,
          postId,
          userId,
        });
      },
    });
  };

  const preFetchPostComments = async ({ postId, sortBy = "desc" }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllPostCommentsQueryKey({
        postId,
        sortBy,
      }).queryKey,
      queryFn: () => {
        return getAllCommentsService({
          userId: currentUserId,
          postId,
          sortBy,
        });
      },
    });
  };

  const preFetchUserFollowers = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowersQueryKey({
        userId,
      }).queryKey,
      queryFn: (data) => {
        return getAllFollowersService({ ...data, userId });
      },
    });
  };

  const preFetchUserFollowings = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowingsQueryKey({
        userId,
      }).queryKey,
      queryFn: (data) => {
        return getAllFollowingsService({ ...data, userId });
      },
    });
  };

  const preFetchAllTaggedPosts = async ({ hashtagId, hashtagName }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllTaggedPostsQueryKey({
        hashtagId,
      }).queryKey,
      queryFn: (data) => {
        return getAllTaggedPostService({ ...data, hashtagId, hashtagName });
      },
    });
  };
  const preFetchUserStats = async ({ userId }) => {
    await queryClient.prefetchQuery({
      queryKey: getUserStatQueryKey({
        userId,
      }).queryKey,
      queryFn: () => {
        return getUserStatService({ userId });
      },
    });
  };

  return {
    preFetchAllUserPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    preFetchIndividualPost,
    preFetchPostComments,
    preFetchUserFollowers,
    preFetchUserFollowings,
    preFetchAllTaggedPosts,
    preFetchPostAnalytics,
    preFetchUserStats,
  };
};
