import { useQuery } from "@tanstack/react-query";
import { userServices } from "@/services/user/userServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetUserInfo = ({ userId, currentUserId = 0 }) => {
  const { getUserInfoService } = userServices();
  const { getUserInfoQueryKey } = useQueryKey();

  const { isPending, data, error, isError, isRefetching,isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getUserInfoQueryKey({
      userId,
    }).queryKey,
    queryFn: () => {
      return getUserInfoService({ userId, currentUserId });
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isRefetching,isSuccess };
};
