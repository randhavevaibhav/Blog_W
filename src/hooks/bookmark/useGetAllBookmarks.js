import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { bookmarkServices } from "@/services/bookmark/bookmarkServices";

export const useGetAllBookmarks = ({sortBy="desc"}) => {

  const {auth} = useAuth();
  const {getAllBookmarksService} = bookmarkServices();
  const userId = auth.userId;
 
  const { isPending, data, error, isError,isFetching,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getAllBookmarks", userId.toString(),sortBy],
    queryFn: ()=>getAllBookmarksService({
      userId,
      sortBy
    }),
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isFetching,isSuccess };
};
