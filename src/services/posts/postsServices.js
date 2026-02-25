import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";
import { sleep } from "@/utils/utils";

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
    const { postId, archive = 0 } = data;
    const res = await axiosPrivate.get(`/post/${postId}`, {
      params: {
        archive,
      },
    });
    const resData = await res.data;
    return resData;
  };

  const getAllUserPostsService = async (data) => {
    const { pageParam, sortBy, archive = 0 } = data;
    const offset = pageParam ? pageParam : 0;
    //add artificial delay to avoid snappy UI
    await sleep(200);
    const res = await axiosPrivate.get(`/user/posts`, {
      params: {
        offset,
        sort: sortBy,
        archive,
      },
    });

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
    const { pageParam, hashtagId } = data;
    const offset = pageParam ? pageParam : 0;

    const res = await axiosPrivate.get(`/tag/${hashtagId}/?offset=${offset}`);

    const resData = await res.data;

    return resData;
  };

  const getSearchedPostsService = async (data) => {
    const { pageParam, sortBy, query, hashtagId } = data;
    const offset = pageParam ? pageParam : 0;
    const res = await axiosPrivate.get(`/posts/search`, {
      params: {
        query,
        hashtag: hashtagId,
        sort: sortBy,
        offset,
      },
    });
    const resData = await res.data;
    return resData;
  };

  const getSearchedPostsHashtagsService = async (data) => {
    const { query } = data;
    const res = await axiosPrivate.get(`/posts/search/hashtag`, {
      params: {
        query,
      },
    });
    const resData = await res.data;
    return resData;
  };

  const getSearchSuggestionsService = async (data) => {
    const { query, sortBy, limit } = data;
    const res = await axiosPrivate.get(
      `/posts/search?query=${query}&offset=0&sortby=${sortBy}&limit=${limit}`,
    );
    const resData = await res.data;
    return resData;
  };

  const getTopRatedPostsService = async () => {
    const res = await axiosPrivate.get(`/posts/top-rated`);

    const resData = await res.data;

    return resData;
  };

  const archivePostService = async (data) => {
    const res = await axiosPrivate.patch(`/post/archive`, data);
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
    getSearchedPostsService,
    getIndividualPostService,
    getSearchSuggestionsService,
    getSearchedPostsHashtagsService,
    getAllTaggedPostService,
    getTopRatedPostsService,
    archivePostService,
  };
};
