import { useQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetPostAnalytics = ({ postId, userId }) => {
  const { getPostAnalyticsService } = postsServices();
  const { getPostAnalyticsQueryKey } = useQueryKey();

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getPostAnalyticsQueryKey({
      postId,
    }).queryKey,
    queryFn: () => {
      return getPostAnalyticsService({
        postId,
        userId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: Global_Use_Query_Retry,
    enabled: !!userId,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
