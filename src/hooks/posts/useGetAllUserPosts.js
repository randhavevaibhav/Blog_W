import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetAllUserPosts = ({ sortBy }) => {
  const { getAllUserPostsService } = postsServices();
  const {getAllUserPostsQueryKey} = useQueryKey()
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
    
    queryKey: getAllUserPostsQueryKey({
      userId,
      sortBy
    }).queryKey,
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: (data) => {
      return getAllUserPostsService({
        ...data,
        userId,
        sortBy,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: Global_Use_Query_Retry,
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
