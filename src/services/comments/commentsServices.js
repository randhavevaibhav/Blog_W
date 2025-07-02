import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const commentsServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createCommentService = async (data) => {
    const res = await axiosPrivate.post(`/comment`, data);

    const resData = await res.data;
    return resData;
  };

  const deleteCommentService = async (data) => {
    const { hasReplies, commentId, userId, postId } = data;

    const res = await axiosPrivate.post(`comment/delete`, {
      hasReplies,
      commentId,
      userId,
      postId,
    });

    const resData = await res.data;
    return resData;
  };

  const getAllCommentsService = async (data) => {
    const { pageParam, userId, postId, sortBy } = data;

    const offset = pageParam ? pageParam : 0;
    let res = [];
    if (userId) {
      res = await axiosPrivate.get(
        `/comments/${userId}/${postId}?offset=${offset}&sortby=${sortBy}`
      );
    } else {
      res = await axiosPrivate.get(
        `/comments/${postId}?offset=${offset}&sortby=${sortBy}`
      );
    }
    const resData = await res.data;
    return resData;
  };

  return {
    createCommentService,
    deleteCommentService,
    getAllCommentsService,
  };
};
