import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const followerServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createFollowerService = async (data) => {
    const res = await axiosPrivate.post("/follower", data);

    const resData = await res.data;
    return resData;
  };

  const getAllFollowersService = async (data) => {
    const { userId,pageParam } = data;
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(`/followers/${userId}?offset=${offset}`);

    const resData = await res.data;
    return resData;
  };

  const getAllFollowingsService = async (data) => {
    const { userId,pageParam } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(`/followings/${userId}?offset=${offset}`);

    const resData = await res.data;
    return resData;
  };

  const removefollowerService = async (data) => {
    const { currentUserId, followingUserId } = data;
    const res = await axiosPrivate.delete(
      `/follower/${currentUserId}/${followingUserId}`
    );

    const resData = await res.data;
    return resData;
  };

  return {
    createFollowerService,
    getAllFollowersService,
    getAllFollowingsService,
    removefollowerService,
  };
};
