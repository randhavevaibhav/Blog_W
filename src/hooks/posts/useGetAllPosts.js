import { useInfiniteQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";

export const useGetAllPosts = () => {
  const {getAllPostsService} = postsServices();


  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading,isError } =
    useInfiniteQuery({
      queryKey: ["getAllPostsFeed"],
      getNextPageParam: (lastPage, pages) => {
        // console.log("lastPage =======> ", JSON.parse(lastPage.posts).map((item)=>item.title));
        // console.log("lastPage offset =======> ",lastPage.offset)
        return lastPage.offset;
      },
      queryFn: (data)=>{
        return getAllPostsService({
          ...data
        })
      },
      retry:1,
      refetchOnWindowFocus:false
    });

  return { data, error, fetchNextPage, hasNextPage, isFetching, isLoading ,isError};
};
