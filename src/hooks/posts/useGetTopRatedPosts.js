import { useQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useAuth } from "../auth/useAuth";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetTopRatedPosts = () => {
  const { getTopRatedPostsService } = postsServices();
  const { getTopRatedPostsQueryKey } = useQueryKey();

  const { data, error, isError, isPending, isLoading,isSuccess } = useQuery({
    queryKey: getTopRatedPostsQueryKey().queryKey,

    queryFn: getTopRatedPostsService,
    retry: Global_Use_Query_Retry,
    refetchOnWindowFocus: false,
  });

  return { data, error, isError, isPending, isLoading ,isSuccess};
};
