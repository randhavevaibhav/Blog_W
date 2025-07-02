import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";

export const useGetAllOwnPosts = ({ sortBy }) => {
  const {getAllOwnPostsService} = postsServices();
  const { auth } = useAuth();
  const userId = auth.userId;

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
    queryKey: ["getAllOwnPosts", userId.toString(), sortBy],
    getNextPageParam: (lastPage, pages) => {
      // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
      // console.log("lastPage offset =======> ",lastPage.offset)
      return lastPage.offset;
    },
    queryFn: (data)=>{

      return getAllOwnPostsService({
        ...data,
        userId,
        sortBy
      })
    },
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
