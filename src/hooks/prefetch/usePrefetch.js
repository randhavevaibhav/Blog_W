import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { userServices } from "@/services/user/userServices";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const { getIndiviualPostService, getAllOwnPostsService } = postsServices();
  const { getAllBookmarksService } = bookmarkServices();
  const { getUserInfoService } = userServices();
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;

 

  const preFetchAllOwnPosts = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["getAllOwnPosts", currentUserId.toString(), "desc"],
      queryFn: (data) => {
        return getAllOwnPostsService({
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
      queryKey: ["getAllBookmarks", currentUserId.toString(), sortBy],
      queryFn: () =>
        getAllBookmarksService({
          userId: currentUserId,
          sortBy,
        }),
    });
  };

  const preFetchUserInfo = async ({ userId }) => {
    await queryClient.prefetchQuery({
      queryKey: ["getUserInfo", userId.toString()],
      queryFn: () => {
        return getUserInfoService({ userId: currentUserId });
      },
    });
  };

  const PreFetchIndiviualPost = async ({ userId, postId, imgURL }) => {

     //fetch image
    if (imgURL) {
      const image = new Image();
      image.src = imgURL;
    }
    // console.log("postId ======>",postId)

    // console.log("userId =====> ",userId)

    //pass userId twice as  queryKey because for IndiviualPost reuires two userId's
    // current user and user which created that post
    await queryClient.prefetchQuery({
      queryKey: ["getIndiviualPost", userId.toString(), postId.toString()],
      queryFn: () => {
      return getIndiviualPostService({
        currentUserId,
        postId,
        userId,
      });
    },
    });
  };

  return {
    preFetchAllOwnPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    PreFetchIndiviualPost,
  };
};
