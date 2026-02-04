import { useQuery } from "@tanstack/react-query";
import { userServices } from "@/services/user/userServices";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetUserInfo = ({ userId ,queryEnable=true}) => {
  const { getUserInfoService } = userServices();
  const { getUserInfoQueryKey } = useQueryKey();

  const { isPending, data, error, isError, isRefetching,isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getUserInfoQueryKey({
      userId,
    }).queryKey,
    queryFn: () => {
      return getUserInfoService({ userId });
    },
    enabled:queryEnable,
    //specify no. times re-fetch data when first attempt fails
    retry:Global_Use_Query_Retry,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isRefetching,isSuccess };
};
