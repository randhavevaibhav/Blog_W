import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const postsServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const createPostService = async (data) => {
    const res = await axiosPrivate.post("/post", data);

    const resData = await res.data;
    return resData;
  };

  const deletePostService = async (data) => {
    const { postId } = data;
    const res = await axiosPrivate.delete(`/post/delete/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const updatePostService = async (data) => {
    const res = await axiosPrivate.patch(`/post/edit`, data);

    const resData = await res.data;
    return resData;
  };

  const uploadFileService = async (data) => {
    const { formData, url } = data;
    const res = await axiosPrivate.post(`/upload/${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const resData = await res.data;
    return resData;
  };

  const getIndividualPostService = async (data) => {
    const { postId } = data;
    const res = await axiosPrivate.get(`/post/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const getAllUserPostsService = async (data) => {
    const { pageParam, sortBy } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/user/posts/?offset=${offset}&sort=${sortBy}`
    );

    const resData = await res.data;
    return resData;
  };

  const getAllFollowingUsersPostsService = async (data) => {
    const { pageParam } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(`/following/posts/?offset=${offset}`);

    const resData = await res.data;
    return resData;
  };

  const getAllPostsService = async (data) => {
    const { pageParam } = data;
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(`/posts/all/?offset=${offset}`);

    const resData = await res.data;

    return resData;
  };

  const getAllTaggedPostService = async (data) => {
    const { pageParam, hashtagId, hashtagName } = data;
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(
      `/tag/${hashtagId}/${encodeURIComponent(hashtagName)}?offset=${offset}`
    );

    const resData = await res.data;

    return resData;
  };

  const getAllSearchedPostsService = async (data) => {
    const { pageParam, sortBy, query } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/posts/search?query=${query}&offset=${offset}&sortby=${sortBy}`
    );

    const resData = await res.data;

    return resData;
  };

  const getSearchSuggestionsService = async (data) => {
    const { query, sortBy, limit } = data;
    const res = await axiosPrivate.get(
      `/posts/search?query=${query}&offset=0&sortby=${sortBy}&limit=${limit}`
    );
    const resData = await res.data;
    return resData;
  };

  const getPostAnalyticsService = async (data) => {
    const { userId, postId } = data;
    const res = await axiosPrivate.get(`/post/analytics/${userId}/${postId}`);
    const resData = await res.data;
    return resData;
  };

  return {
    createPostService,
    updatePostService,
    uploadFileService,
    deletePostService,
    getAllUserPostsService,
    getAllFollowingUsersPostsService,
    getAllPostsService,
    getAllSearchedPostsService,
    getIndividualPostService,
    getSearchSuggestionsService,
    getAllTaggedPostService,
    getPostAnalyticsService,
  };
};
