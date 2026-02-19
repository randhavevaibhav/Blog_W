import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { userServices } from "@/services/user/userServices";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";
import { commentsServices } from "@/services/comments/commentsServices";
import { hashtagsServices } from "@/services/hashtags/hashtagsServices";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const {
    getIndividualPostService,
    getAllUserPostsService,
    getAllTaggedPostService,
  } = postsServices();
  const { getAllCommentsService } = commentsServices();
  const { getAllBookmarksService, getAllBookmarksTagsService } =
    bookmarkServices();
  const { getUserInfoService } = userServices();
  const { getAllFollowersService, getAllFollowingsService } =
    followerServices();

  const { getAllHashtagsService } = hashtagsServices();

  const {
    getAllBookmarksQueryKey,
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getIndividualPostQueryKey,
    getAllPostCommentsQueryKey,
    getUserInfoQueryKey,
    getAllUserPostsQueryKey,
    getAllTaggedPostsQueryKey,
    getAllHashtagsQueryKey,
    getAllBookmarksTagsQueryKey,
  } = useQueryKey();

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
          sortBy: "desc",
        });
      },
    });
  };

  const preFetchBookmarks = async ({ sortBy = "desc",hashtagId=0 }) => {
    await queryClient.prefetchQuery({
      queryKey: getAllBookmarksQueryKey({
        userId: currentUserId,
        sortBy,
        hashtagId,
      }).queryKey,
      queryFn: () =>
        getAllBookmarksService({
          sortBy,
          hashtagId,
        }),
    });
  };

  const preFetchBookmarksTags = async () => {
    await queryClient.prefetchQuery({
      queryKey: getAllBookmarksTagsQueryKey({
        userId: currentUserId,
      }).queryKey,
      queryFn: () => getAllBookmarksTagsService(),
    });
  };

  const preFetchUserInfo = async ({ userId }) => {
    await queryClient.prefetchQuery({
      queryKey: getUserInfoQueryKey({
        userId,
      }).queryKey,
      queryFn: () => {
        return getUserInfoService({ userId });
      },
    });
  };

  const preFetchIndividualPost = async ({ postId, imgURL }) => {
    //fetch image
    if (imgURL) {
      const image = new Image();
      image.src = imgURL;
    }
    await queryClient.prefetchQuery({
      queryKey: getIndividualPostQueryKey({
        postId,
      }).queryKey,
      queryFn: () => {
        return getIndividualPostService({
          postId,
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
          postId,
          sortBy,
        });
      },
    });
  };

  const preFetchUserFollowers = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowersQueryKey({ userId }).queryKey,
      queryFn: (data) => {
        return getAllFollowersService({ ...data });
      },
    });
  };

  const preFetchUserFollowings = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowingsQueryKey({
        userId,
      }).queryKey,
      queryFn: (data) => {
        return getAllFollowingsService({ ...data });
      },
    });
  };

  const preFetchAllTaggedPosts = async ({ hashtagId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllTaggedPostsQueryKey({
        hashtagId,
      }).queryKey,
      queryFn: (data) => {
        return getAllTaggedPostService({ ...data, hashtagId });
      },
    });
  };

  const preFetchAllHashtags = async () => {
    await queryClient.prefetchQuery({
      queryKey: getAllHashtagsQueryKey().queryKey,
      queryFn: getAllHashtagsService,
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
    preFetchAllHashtags,
    preFetchBookmarksTags,
  };
};
