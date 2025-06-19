import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";

export const useGetAllPostComments = ({ sortBy }) => {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const { userId, postId } = useParams();

  const getAllPostCommentsQueryKey = [
    "getAllPostComments",
    postId.toString(),
    userId.toString(),
    sortBy,
  ];

  const fetchAllPostComments = async ({ pageParam }) => {
    // console.log("pageParam ===> ", pageParam);
    const offset = pageParam ? pageParam : 0;
    let res = [];
    if (currentUserId) {
      res = await axiosPrivate.get(
        `/comments/${currentUserId}/${postId}?offset=${offset}&sortby=${sortBy}`
      );
    } else {
      res = await axiosPrivate.get(
        `/comments/${postId}?offset=${offset}&sortby=${sortBy}`
      );
    }

    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;

    return resData;
  };

  const { data, isError, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: getAllPostCommentsQueryKey,
      staleTime:0,
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: fetchAllPostComments,
      retry: 1,
      refetchOnWindowFocus: false,
    });

  return { data, isError, fetchNextPage, hasNextPage, isFetching, isLoading };
};
