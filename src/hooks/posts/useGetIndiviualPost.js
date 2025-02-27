import { useQuery } from "@tanstack/react-query";
import { getLocalStorageItem } from "../../utils/browser";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { localUserId } from "../../utils/constants";

export const useGetIndiviualPost = ({ postId }) => {
  const axiosPrivate = useAxiosPrivate();
  const userId = getLocalStorageItem(localUserId);

  // console.log("res =======> ",postId)
  const fetchIndiviualPost = async () => {
    const res = await axiosPrivate.get(`/posts/${userId}/${postId}`);
    const resData = await res.data;
   

    return resData;
  };

  const { isPending, data, error, isError } = useQuery({
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getIndiviualPost", userId, postId],
    queryFn: fetchIndiviualPost,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError };
};
