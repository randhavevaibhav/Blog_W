import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const userServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUserInfoService = async (data) => {
    const { userId, currentUserId } = data;
    let res = {};
    if (currentUserId) {
      res = await axiosPrivate.get(`/user/info/${currentUserId}/${userId}`);
    } else {
      res = await axiosPrivate.get(`/user/info/${userId}`);
    }

    const resData = await res.data;
    return resData;
  };

  const getUserStatService = async (data) => {
    const { userId } = data;
    const res = await axiosPrivate.get(`/user/stat/${userId}`);
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
    getUserInfoService,
    getUserStatService,
  };
};
