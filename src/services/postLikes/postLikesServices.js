import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const postLikesServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const dislikePostService = async (data) => {
    const {  postId } = data;
    const res = await axiosPrivate.post(`/post/dislike`, {
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const likePostService = async (data) => {
    const {  postId } = data;
    const res = await axiosPrivate.post(`/post/like`, {
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  return {
    dislikePostService,
    likePostService,
  };
};
