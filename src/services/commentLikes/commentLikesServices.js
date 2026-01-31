import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const commentLikesServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const dislikeCommentService = async (data) => {
    const res = await axiosPrivate.post(`/comment/dislike`, data);
    const resData = await res.data;
    return resData;
  };

  const likeCommentService = async (data) => {
    const res = await axiosPrivate.post(`/comment/like`, data);

    const resData = await res.data;
    return resData;
  };

  return {
    dislikeCommentService,
    likeCommentService,
  };
};
