import { useQuery } from "@tanstack/react-query";
import { hashtagsServices } from "@/services/hashtags/hashtagsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllHashtags = () => {
  const { getAllHashtagsService } = hashtagsServices();
  const {getAllHashtagsQueryKey} = useQueryKey()


  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: getAllHashtagsQueryKey().queryKey,
    queryFn: getAllHashtagsService,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
