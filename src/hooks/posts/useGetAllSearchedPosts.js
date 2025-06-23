import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

export const useGetAllSearchedPosts = ({ query,sortBy }) => {
  const axiosPrivate = useAxiosPrivate();

  const fetchAllSearchedPosts = async ({ pageParam }) => {
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/posts/search?query=${query}&offset=${offset}&sortby=${sortBy}`
    );

    const resData = await res.data;

    return resData;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllSearchedPosts", query,sortBy],
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: fetchAllSearchedPosts,
      retry: 1,
      refetchOnWindowFocus: false,
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isLoading };
};
