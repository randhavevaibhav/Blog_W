import { useQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { useAuth } from "../auth/useAuth";

export const useGetPostAnalytics = ({ postId }) => {
  const { getPostAnalyticsService } = postsServices();
  const { getPostAnalyticsQueryKey } = useQueryKey();
  const { auth } = useAuth();
  const currentUserId = auth.userId;
  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getPostAnalyticsQueryKey({
      postId,
    }).queryKey,
    queryFn: () => {
      return getPostAnalyticsService({
        postId,
        userId: currentUserId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
