import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { postsServices } from "@/services/posts/postsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetIndiviualPost = () => {
  const { getIndiviualPostService } = postsServices();
  const {getIndiviualPostQueryKey} = useQueryKey()
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getIndiviualPostQueryKey({
      userId,
      postId
    }).queryKey,
    queryFn: () => {
      return getIndiviualPostService({
        currentUserId,
        postId,
        userId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
