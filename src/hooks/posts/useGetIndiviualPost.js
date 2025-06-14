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
    let res = {};

    if (currentUserId) {
      res = await axiosPrivate.get(
        `/post/${currentUserId}/${userId}/${postId}`
      );
    } else {
      res = await axiosPrivate.get(`/post/${userId}/${postId}`);
    }

    const resData = await res.data;

    return resData;
  };

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getIndiviualPost", userId.toString(), postId.toString()],
    queryFn: fetchIndiviualPost,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
