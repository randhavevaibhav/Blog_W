import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { getLocalStorageItem } from "../../utils/browser";

export const useGetAllPosts = () => {
  const axiosPrivate = useAxiosPrivate();
  const userId = getLocalStorageItem("userId");
  const fetchPosts = async () => {
    const res = await axiosPrivate.get(`/posts/${userId}`);
    // console.log("response from axiosPrivate ===> ", res);
    return res;
  };

  const { isPending, data, error, isError } = useQuery({
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getAllPosts", userId],
    queryFn: fetchPosts,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError };
};
