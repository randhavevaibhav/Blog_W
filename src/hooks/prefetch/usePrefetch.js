import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { userServices } from "@/services/user/userServices";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const { getIndividualPostService, getAllUserPostsService } = postsServices();
  const {
    getAllBookmarksQueryKey,
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getIndividualPostQueryKey,
    getUserInfoQueryKey,
    getAllUserPostsQueryKey
  } = useQueryKey();
  const { getAllBookmarksService } = bookmarkServices();
  const { getUserInfoService } = userServices();
  const { getAllFollowersService, getAllFollowingsService } =
    followerServices();
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;

  const preFetchAllOwnPosts = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllUserPostsQueryKey({
        userId: currentUserId,
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

  const preFetchBookmarks = async () => {
    const sortBy = "desc";
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
    // console.log("postId ======>",postId)

    // console.log("userId =====> ",userId)

    
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

  const preFetchUserFollowers = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowersQueryKey({
        userId,
      }).queryKey,
      queryFn: () => {
        return getAllFollowersService({ userId });
      },
    });
  };

  const preFetchUserFollowings = async ({ userId }) => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: getAllFollowingsQueryKey({
        userId,
      }).queryKey,
      queryFn: () => {
        return getAllFollowingsService({ userId });
      },
    });
  };

  return {
    preFetchAllOwnPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    preFetchIndividualPost,
    preFetchUserFollowers,
    preFetchUserFollowings,
  };
};
