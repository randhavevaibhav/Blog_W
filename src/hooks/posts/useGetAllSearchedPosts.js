import { useInfiniteQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllSearchedPosts = ({ query, sortBy }) => {

  const { getAllSearchedPostsService } = postsServices();
  const {getAllSearchedPostsQueryKey} =useQueryKey()
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: getAllSearchedPostsQueryKey({
        query,
        sortBy
      }).queryKey,
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: (data) => {
        return getAllSearchedPostsService({
          ...data,
          query,
          sortBy,
        });
      },
      retry: 1,
      refetchOnWindowFocus: false,
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isLoading };
};
