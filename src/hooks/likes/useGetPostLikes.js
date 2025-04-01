import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const useGetPostLikes = () => {
  const axiosPrivate = useAxiosPrivate();  
  const {auth} = useAuth();
    const userId = auth.userId;
  const {postId} = useParams();
  const fetchPostLikes = async () => {
    const res = await axiosPrivate.get(`/likes/${userId}/${postId}`);
   
    const resData = await res.data;
    //  console.log("resData from fetchComments ===> ", resData);
    return resData;
  };

  const { isPending, data, error, isError,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getTotalPostLikes",postId.toString()],
    queryFn: fetchPostLikes,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isSuccess };
};
