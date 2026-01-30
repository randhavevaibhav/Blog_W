import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const commentsServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createCommentService = async (data) => {
    const res = await axiosPrivate.post(`/comment`, data);

    const resData = await res.data;
    return resData;
  };

  const deleteCommentService = async (data) => {
    const { hasReplies, commentId, postId } = data;

    const res = await axiosPrivate.delete(
      `comment/delete/${commentId}/${postId}/${hasReplies}`,
    );

    const resData = await res.data;
    return resData;
  };

  const updateCommentService = async (data) => {
    const res = await axiosPrivate.patch(`comment/update`, data);

    const resData = await res.data;
    return resData;
  };

  const getAllCommentsService = async (data) => {
    const { pageParam, postId, sortBy } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/comments/${postId}?offset=${offset}&sortby=${sortBy}`,
    );

    const resData = await res.data;
    return resData;
  };

  return {
    createCommentService,
    deleteCommentService,
    getAllCommentsService,
    updateCommentService,
  };
};
