import { useInfiniteQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useAuth } from "../auth/useAuth";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetAllPosts = () => {
  const {getAllPostsService} = postsServices();
  const {getAllPostsFeedQueryKey} = useQueryKey()
  const {auth} = useAuth();
  const {userId} = auth;


  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading,isError } =
    useInfiniteQuery({
      queryKey: getAllPostsFeedQueryKey().queryKey,
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: (data)=>{
        return getAllPostsService({
          ...data,
          userId
        })
      },
      retry:Global_Use_Query_Retry,
      refetchOnWindowFocus:false
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isLoading ,isError};
};
