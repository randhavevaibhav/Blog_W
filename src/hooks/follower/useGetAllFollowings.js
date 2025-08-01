
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllFollowings = () => {
  const { auth } = useAuth();
  const { getAllFollowingsService } = followerServices();
  const {getAllFollowingsQueryKey} = useQueryKey()
  const userId = auth.userId;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getAllFollowingsQueryKey({
      userId
    }).queryKey,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.offset;
    },
    queryFn: (data) =>
      getAllFollowingsService({
        ...data,
        userId,
      }),
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  };
};
