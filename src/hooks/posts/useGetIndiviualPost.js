import { useQuery } from "@tanstack/react-query";

import { useAxiosPrivate } from "../api/useAxiosPrivate";

import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const useGetIndiviualPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId, postId } = useParams();
  const { auth } = useAuth();
  const currentUserId = auth.userId;

  // console.log("res =======> ",postId)
  const fetchIndiviualPost = async () => {
    const res = await axiosPrivate.get(`/post/${currentUserId}/${userId}/${postId}`);
    const resData = await res.data;

    return resData;
  };

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getIndiviualPost",currentUserId.toString(), userId.toString(), postId.toString()],
    queryFn: fetchIndiviualPost,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
