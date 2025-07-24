import { useInfiniteQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllTaggedPosts = ({ hashtagId,hashtagName }) => {
  const { getAllTaggedPostService } = postsServices();
  const { getAllTaggedPostsQueryKey } = useQueryKey();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: getAllTaggedPostsQueryKey({
      hashtagId,
    }).queryKey,
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: (data) => {
      return getAllTaggedPostService({
        ...data,
        hashtagId,
        hashtagName
      });
    },
    retry: 1,
    refetchOnWindowFocus: false,
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
