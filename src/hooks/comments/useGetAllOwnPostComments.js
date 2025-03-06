import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";


export const useGetAllOwnPostComments = () => {
  const axiosPrivate = useAxiosPrivate();
  const {auth} = useAuth();
  const userId = auth.userId;

  const fetchOwnComments = async () => {
    const res = await axiosPrivate.get(`/getallcomments/${userId}`);
   
    const resData = await res.data;
    //  console.log("resData from fetchComments ===> ", resData);
    return resData;
  };

  const { isPending, data, error, isError } = useQuery({
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getAllOwnComments", userId],
    queryFn: fetchOwnComments,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError };
};
