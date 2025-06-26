import {  useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";

export const useGetSearchSuggestions = ({ query,sortBy,limit }) => {
  const axiosPrivate = useAxiosPrivate();

  const fetchSearchSuggestions = async () => {
    
    const res = await axiosPrivate.get(
      `/posts/search?query=${query}&offset=0&sortby=${sortBy}&limit=${limit}`
    );

    const resData = await res.data;

    return resData;
  };

  const { data, error, isLoading } =
    useQuery({
      queryKey: ["getSearchSuggestions", query],
      queryFn: fetchSearchSuggestions,
      retry: 1,
      refetchOnWindowFocus: false,
    });

  return { data, error, isLoading };
};
