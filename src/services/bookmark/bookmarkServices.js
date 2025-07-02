import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const bookmarkServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createBookmarkService = async (data) => {
    const res = await axiosPrivate.post("/bookmarks", data);

    const resData = await res.data;
    return resData;
  };

  const getAllBookmarksService = async (data) => {
    const { userId, sortBy } = data;
    const res = await axiosPrivate.get(`/bookmarks/${userId}?sort=${sortBy}`);

    const resData = await res.data;
    return resData;
  };

  const removeBookmarkService = async (data) => {
    const { currentUserId, postId } = data;
    const res = await axiosPrivate.delete(
      `/bookmarks/${currentUserId}/${postId}`
    );

    const resData = await res.data;
    return resData;
  };

  return {
    createBookmarkService,
    getAllBookmarksService,
    removeBookmarkService,
  };
};
