import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllFollowingUsersPosts = () => {
  const { getAllFollowingUsersPostsService } = postsServices();
  const {getAllFollowingUsersPostsQueryKey} = useQueryKey()
  const { auth } = useAuth();
  const userId = auth.userId;

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
    data,
    error,
    isError,
    isSuccess,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getAllFollowingUsersPostsQueryKey({
      userId
    }).queryKey,
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: (data) => {
      return getAllFollowingUsersPostsService({
        ...data,
        userId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    data,
    error,
    isError,
    isSuccess,
  };
};
