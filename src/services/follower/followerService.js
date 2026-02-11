import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";


export const followerServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createFollowerService = async (data) => {
    const res = await axiosPrivate.post("/follower", data);

    const resData = await res.data;
    return resData;
  };

  const getAllFollowersService = async (data) => {
    const { pageParam,sort,mutual } = data;
    const offset = pageParam ? pageParam : 0;
  
    const res = await axiosPrivate.get(`/followers`,{
      params:{
        offset,
        sort,
        mutual
      }
    });

    const resData = await res.data;

    const followers = resData?.followers;
    if (followers) {
      followers.map((follower) => {
        if (follower?.profileImgURL) {
          const image = new Image();
          image.src = follower.profileImgURL;
        }
      });
    }

    return resData;
  };

  const getAllFollowingsService = async (data) => {
    const { pageParam ,sort,mutual} = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/followings/`
      ,{
        params:{
          offset,
          sort,
          mutual
        }
      }
    );

    const resData = await res.data;
    const followingUsers = resData?.followings;

    if (followingUsers) {
      followingUsers.map((followingUser) => {
        if (followingUser?.profileImgURL) {
          const image = new Image();
          image.src = followingUser.profileImgURL;
        }
      });
    }
    return resData;
  };

  const removeFollowerService = async (data) => {
    const { followingUserId } = data;
    const res = await axiosPrivate.delete(
      `/follower/${followingUserId}`
    );

    const resData = await res.data;
    return resData;
  };

  return {
    createFollowerService,
    getAllFollowersService,
    getAllFollowingsService,
    removeFollowerService,
  };
};
