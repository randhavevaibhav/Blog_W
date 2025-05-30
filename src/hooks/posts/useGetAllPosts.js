import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

export const useGetAllPosts = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchAllPosts = async ({ pageParam }) => {
    // console.log("pageParam ===> ", pageParam);
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(`/getallposts?offset=${offset}`);

    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;
   

    return resData;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["getAllPostsFeed"],
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: fetchAllPosts,
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isLoading };
};
