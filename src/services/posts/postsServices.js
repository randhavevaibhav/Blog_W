import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";

export const postsServices = () => {
  const axiosPrivate = useAxiosPrivate();

  const createPostService = async (data) => {
    const res = await axiosPrivate.post("/post", data);

    const resData = await res.data;
    return resData;
  };

  const deletePostService = async (data) => {
    const { postId, userId } = data;
    const res = await axiosPrivate.delete(`/post/delete/${userId}/${postId}`);
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
    const { currentUserId, userId, postId } = data;
    let res = {};

    res = await axiosPrivate.get(`/post/${userId}/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const getAllUserPostsService = async (data) => {
    const { pageParam, sortBy, userId } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/user/posts/${userId}?offset=${offset}&sort=${sortBy}`
    );

    const resData = await res.data;
    return resData;
  };

  const getAllFollowingUsersPostsService = async (data) => {
    const { pageParam, userId } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(
      `/following/posts/${userId}?offset=${offset}`
    );

    const resData = await res.data;
    return resData;
  };

  const getAllPostsService = async (data) => {
    const { pageParam, userId } = data;
    const offset = pageParam ? pageParam : 0;
    let res = {};
    if (userId) {
      res = await axiosPrivate.get(`/posts/all/${userId}?offset=${offset}`);
    } else {
      res = await axiosPrivate.get(`/posts/all?offset=${offset}`);
    }

    const resData = await res.data;

    return resData;
  };

  const getAllTaggedPostService = async (data) => {
    const { pageParam, hashtagId,hashtagName } = data;
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(`/tag/${hashtagId}/${hashtagName}?offset=${offset}`);

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
    const { currentUserId, userId, postId } = data;
    let res = {};

    if (currentUserId) {
      res = await axiosPrivate.get(
        `/post/analytics/${currentUserId}/${userId}/${postId}`
      );
    } else {
      res = await axiosPrivate.get(`/post/analytics/${userId}/${postId}`);
    }
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
