import { useQuery } from "@tanstack/react-query";
import { hashtagsServices } from "@/services/hashtags/hashtagsServices";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetPopularHashtags = () => {
  const { getPopularHashtagsService } = hashtagsServices();
  const {getPopularHashtagsQueryKey} = useQueryKey()


  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getPopularHashtagsQueryKey().queryKey,
    queryFn: getPopularHashtagsService,
    //specify no. times re-fetch data when first attempt fails
    retry: Global_Use_Query_Retry,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
