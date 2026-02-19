import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const hashtagsServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllHashtagsService = async () => {
    const res = await axiosPrivate.get(`/hashtags`);
    const resData = await res.data;
    return resData;
  };

  const getPopularHashtagsService = async () => {
    const res = await axiosPrivate.get(`/popular/hashtags`);
    const resData = await res.data;
    return resData;
  };

  return {
    getAllHashtagsService,
    getPopularHashtagsService
  };
};
