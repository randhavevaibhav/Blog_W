import { useQuery } from "@tanstack/react-query";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";
import { postsServices } from "@/services/posts/postsServices";

export const useGetSearchedPostsHashtags = ({query}) => { 
  const {getSearchedPostsHashtagsService} = postsServices();
  const {getSearchedPostsHashtagsQueryKey} = useQueryKey()

  const { isPending, data, error, isError,isFetching,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    
    queryKey: getSearchedPostsHashtagsQueryKey({
      query,
    }).queryKey,
    queryFn: ()=>getSearchedPostsHashtagsService({
      query
    }),
    //specify no. times re-fetch data when first attempt fails
    retry:Global_Use_Query_Retry,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isFetching,isSuccess };
};
