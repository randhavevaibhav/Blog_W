import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useGetAllBookmarks = ({sortBy="desc"}) => {

  const {auth} = useAuth();
  const {getAllBookmarksService} = bookmarkServices();
  const {getAllBookmarksQueryKey} = useQueryKey()

  const userId = auth.userId;
 
  const { isPending, data, error, isError,isFetching,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    
    queryKey: getAllBookmarksQueryKey({
      userId,
      sortBy
    }).queryKey,
    queryFn: ()=>getAllBookmarksService({
      sortBy
    }),
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isFetching,isSuccess };
};
