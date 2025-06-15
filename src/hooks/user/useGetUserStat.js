import { useQuery } from "@tanstack/react-query";

import { useAxiosPrivate } from "../api/useAxiosPrivate";

import { useAuth } from "../auth/useAuth";

export const useGetUserStat = () => {
  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();
  const currentUserId = auth.userId;

  const fetchUserStat = async () => {
    const res = await axiosPrivate.get(`/user/stat/${currentUserId}`);

    const resData = await res.data;

    return resData;
  };

  const { isPending, data, error, isError, isSuccess } = useQuery({
    refetchOnWindowFocus: false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getUserStat", currentUserId.toString()],
    queryFn: fetchUserStat,
    //specify no. times re-fetch data when first attempt fails
    retry: 2,
    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError, isSuccess };
};
