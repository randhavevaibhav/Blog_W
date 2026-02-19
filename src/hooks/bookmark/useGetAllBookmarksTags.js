import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";
import { Global_Use_Query_Retry } from "@/utils/constants";

export const useGetAllBookmarksTags = () => {

  const {auth} = useAuth();
  const {getAllBookmarksTagsService} = bookmarkServices();
  const {getAllBookmarksTagsQueryKey} = useQueryKey()

  const userId = auth.userId;
 
  const { isPending, data, error, isError,isFetching,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    
    queryKey: getAllBookmarksTagsQueryKey({
      userId,
    }).queryKey,
    queryFn: ()=>getAllBookmarksTagsService(),
    //specify no. times re-fetch data when first attempt fails
    retry:Global_Use_Query_Retry,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isFetching,isSuccess };
};
