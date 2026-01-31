import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllPostComments = ({ sortBy }) => {
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const { userId, postId } = useParams();
  const { getAllCommentsService } = commentsServices();
  const { getAllPostCommentsQueryKey } = useQueryKey();

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: getAllPostCommentsQueryKey({
      postId,
      sortBy,
    }).queryKey,
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: (data) => {
      return getAllCommentsService({
        ...data,
        postId,
        sortBy,
      });
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
    error
  };
};
