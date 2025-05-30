import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

import { useAuth } from "../auth/useAuth";

export const useGetAllOwnPosts = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth.userId;

  const fetchOwnPosts = async ({ pageParam }) => {
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(`/posts/${userId}?offset=${offset}`);
    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;
    return resData;
  };

  const {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    data,
    error,
    isError,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getAllOwnPosts", userId.toString()],
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: fetchOwnPosts,
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    data,
    error,
    isError,
  };
};
