import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const postLikesServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const dislikePostService = async (data) => {
    const { userId, postId } = data;
    const res = await axiosPrivate.post(`/post/dislike`, {
      userId,
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const likePostService = async (data) => {
    const { userId, postId, createdAt } = data;
    const res = await axiosPrivate.post(`/post/like`, {
      userId,
      postId,
      createdAt,
    });

    const resData = await res.data;
    return resData;
  };

  return {
    dislikePostService,
    likePostService,
  };
};
