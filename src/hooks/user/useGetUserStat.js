import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { userServices } from "@/services/user/userServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetUserStat = () => {
  const { getUserStatService } = userServices();
  const {getUserStatQueryKey} = useQueryKey()
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey:getUserStatQueryKey({
      userId:currentUserId
    }).queryKey,
    queryFn: () => {
      return getUserStatService({
        userId: currentUserId,
      });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
