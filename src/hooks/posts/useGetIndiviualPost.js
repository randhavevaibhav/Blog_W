import { useQuery } from "@tanstack/react-query";

import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";
import { useParams } from "react-router-dom";


export const useGetIndiviualPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const {userId,postId} = useParams();
 
  // console.log("res =======> ",postId)
  const fetchIndiviualPost = async () => {
    const res = await axiosPrivate.get(`/posts/${userId}/${postId}`);
    const resData = await res.data;
   

    return resData;
  };

  const { isPending, data, error, isError,isSuccess } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getIndiviualPost", userId, postId],
    queryFn: fetchIndiviualPost,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isSuccess };
};
