import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";
import { catchQueryError } from "../utils/catchQueryError";

export const useRemoveIndividualPostBookmark = ({ currentUserId, postId }) => {
  const queryClient = useQueryClient();

  const { removeBookmarkService } = bookmarkServices();
  const {
    getAllBookmarksQueryKey,
    getIndividualPostQueryKey,
    getAllPostsFeedQueryKey,
    getAllFollowingUsersPostsQueryKey,
  } = useQueryKey();

  const homeAndFollowingUserPostsData = () => {
    queryClient.setQueryData(getAllPostsFeedQueryKey().queryKey, (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: oldData.pages.map((page) => {
          const targetPagePost = page.posts[`@${postId}`];
          if (!targetPagePost) return page;
          targetPagePost.isBookmarked = false;
          return {
            ...page,
          };
        }),
      };
    });

    queryClient.setQueryData(
      getAllFollowingUsersPostsQueryKey({
        userId: currentUserId,
      }).queryKey,
      (oldData) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            const targetPagePost = page.posts[`@${postId}`];
            if (!targetPagePost) return page;
            targetPagePost.isBookmarked = false;
            return {
              ...page,
            };
          }),
        };
      },
    );
  };

  const updateIndividualPost = () => {
    queryClient.setQueryData(
      getIndividualPostQueryKey({
        postId,
      }).queryKey,
      (oldData) => {

        if (!oldData) return undefined;
       return{
          ...oldData,
          postData:{
            ...oldData.postData,
            isBookmarked:false
          }
        }
      },
    );
  };

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: () => {
      // console.log("calling mutation fun")
      return removeBookmarkService({
        postId,
      });
    },

    onMutate: catchQueryError(() => {
      const IndividualPostPrevData = queryClient.getQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
      );
      const homePostsPrevData = queryClient.getQueryData(
        getAllPostsFeedQueryKey().queryKey,
      );
      const followingUsersPostsPrevData = queryClient.getQueryData(
        getAllFollowingUsersPostsQueryKey({
          userId: currentUserId,
        }).queryKey,
      );

      updateIndividualPost();
      homeAndFollowingUserPostsData();

      return {
        prevData: {
          IndividualPostPrevData,
          homePostsPrevData,
          followingUsersPostsPrevData,
        },
      };
    }),

    onError: catchQueryError((err, variables, context) => {
      queryClient.setQueryData(
        getIndividualPostQueryKey({
          postId,
        }).queryKey,
        context.prevData.IndividualPostPrevData,
      );

      queryClient.setQueryData(
        getAllPostsFeedQueryKey().queryKey,
        context.prevData.homePostsPrevData,
      );

      queryClient.setQueryData(
        getAllFollowingUsersPostsQueryKey({
          postId,
        }).queryKey,
        context.prevData.followingUsersPostsPrevData,
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
    removeBookmark,
    isPending,
  };
};
