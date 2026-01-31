import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const bookmarkServices = () => {
  const axiosPrivate = useAxiosPrivate();
  const createBookmarkService = async (data) => {
    const res = await axiosPrivate.post("/bookmarks", data);

    const resData = await res.data;
    return resData;
  };

  const getAllBookmarksService = async (data) => {
    const { sortBy } = data;
    const res = await axiosPrivate.get(`/bookmarks/?sort=${sortBy}`);

    const resData = await res.data;
    return resData;
  };

  const removeBookmarkService = async (data) => {
    const { postId } = data;
    const res = await axiosPrivate.delete(
      `/bookmarks/${postId}`
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
