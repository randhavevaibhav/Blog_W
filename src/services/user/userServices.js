import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const userServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUserInfoService = async (data) => {
    const { userId } = data;
    const res = await axiosPrivate.get(`/user/info/${userId}`);
    const resData = await res.data;
    return resData;
  };


  const updateUserService = async (data) => {
    const res = await axiosPrivate.patch(`update/user`, data);

    const resData = await res.data;
    return resData;
  };

  return {
    updateUserService,
    getUserInfoService
  };
};
