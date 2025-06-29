import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

import { useAuth } from "../auth/useAuth";

export const useGetAllBookmarks = ({sortBy="desc"}) => {
  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();
  const userId = auth.userId;
 
  const fetchBookmarks = async () => {
    const res = await axiosPrivate.get(`/bookmarks/${userId}?sort=${sortBy}`);
    
    const resData = await res.data;
    return resData;
  };

  const { isPending, data, error, isError,isFetching,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getAllBookmarks", userId.toString(),sortBy],
    queryFn: fetchBookmarks,
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isFetching,isSuccess };
};
