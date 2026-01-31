import { useQuery } from "@tanstack/react-query";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetIndividualPost = ({ postId }) => {
  const { getIndividualPostService } = postsServices();
  const { getIndividualPostQueryKey } = useQueryKey();
  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getIndividualPostQueryKey({
      postId,
    }).queryKey,
    queryFn: () => {
      return getIndividualPostService({
        postId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
