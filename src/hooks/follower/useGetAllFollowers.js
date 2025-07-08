import { useInfiniteQuery } from "@tanstack/react-query";
import { followerServices } from "@/services/follower/followerService";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllFollowers = ({ userId }) => {
  const { getAllFollowersService } = followerServices();
  const {getAllFollowersQueryKey} = useQueryKey();

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading ,isError } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getAllFollowersQueryKey({
      userId
    }).queryKey,
     getNextPageParam: (lastPage, pages) => {
     
        return lastPage.offset;
      },
    queryFn: (data) =>
      getAllFollowersService({
        ...data,
        userId,
      }),
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { data,error,fetchNextPage, hasNextPage, isFetching, isLoading,isError};
};
