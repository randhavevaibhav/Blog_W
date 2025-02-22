import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

export const useGetAllPosts = (userId) => {
  const axiosPrivate = useAxiosPrivate();

  const fetchPosts = async () => {
    const res = await axiosPrivate.get(`/posts/${userId}`);
    console.log("response from axiosPrivate ===> ", res);
    return res;
  };

  const { isPending, data, error, isError } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: fetchPosts,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError };
};
