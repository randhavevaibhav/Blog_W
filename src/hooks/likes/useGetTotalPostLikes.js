import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";


export const useGetTotalPostLikes = () => {
  const axiosPrivate = useAxiosPrivate();
  const {postId} = useParams();
  const { auth } = useAuth();
    const userId = auth.userId;
 
  const fetchTotalPostLikes = async () => {
    const res = await axiosPrivate.get(`/gettotalpostlikes/${userId}/${postId}`);
    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;
    return resData;
  };

  const { isPending, data, error, isError } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getTotalPostLikes", postId],
    queryFn: fetchTotalPostLikes,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError };
};
