import { useInfiniteQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";

export const useGetAllSearchedPosts = ({ query, sortBy }) => {

  const { getAllSearchedPostsService } = postsServices();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllSearchedPosts", query, sortBy],
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
