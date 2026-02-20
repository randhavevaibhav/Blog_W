export const useQueryKey = () => {
  const getAllBookmarksQueryKey = ({ userId, sortBy, hashtagId }) => {
    if (sortBy && hashtagId) {
      return {
        queryKey: [
          "getAllBookmarks",
          userId.toString(),
          sortBy,
          hashtagId.toString(),
        ],
      };
    } else if (sortBy && !hashtagId) {
      return {
        queryKey: ["getAllBookmarks", userId.toString(), sortBy],
      };
    } else if (!sortBy && hashtagId) {
      return {
        queryKey: ["getAllBookmarks", userId.toString(), hashtagId.toString()],
      };
    } else {
      return {
        queryKey: ["getAllBookmarks", userId.toString()],
      };
    }
  };

  const getAllBookmarksTagsQueryKey = ({ userId }) => {
    return {
      queryKey: ["getAllPostComments", userId],
    };
  };

  const getAllPostCommentsQueryKey = ({ postId, sortBy }) => {
    if (sortBy) {
      return {
        queryKey: ["getAllPostComments", postId.toString(), sortBy],
      };
    } else {
      return {
        queryKey: ["getAllPostComments", postId.toString()],
      };
    }
  };

  const getAllFollowersQueryKey = ({
    userId,
    sort = "desc",
    mutual = "false",
  }) => {
    return {
      queryKey: ["getAllFollowers", userId.toString(), sort, mutual.toString()],
    };
  };

  const getAllFollowingsQueryKey = ({
    userId,
    sort = "desc",
    mutual = "false",
  }) => {
    return {
      queryKey: [
        "getAllFollowings",
        userId.toString(),
        sort,
        mutual.toString(),
      ],
    };
  };

  const getAllFollowingUsersPostsQueryKey = ({ userId }) => {
    if (userId) {
      return {
        queryKey: ["getAllFollowingUsersPosts", userId.toString()],
      };
    } else {
      return {
        queryKey: ["getAllFollowingUsersPosts"],
      };
    }
  };

  const getAllPostsFeedQueryKey = () => {
    return {
      queryKey: ["getAllPostsFeed"],
    };
  };

  const getAllTaggedPostsQueryKey = (data) => {
    if (!data) {
      return {
        queryKey: ["getAllTaggedPosts"],
      };
    }
    const { hashtagId } = data;
    return {
      queryKey: ["getAllTaggedPosts", hashtagId.toString()],
    };
  };

  const getSearchedPostsQueryKey = ({ query, sortBy, hashtagId }) => {
    if (sortBy && hashtagId) {
      return {
        queryKey: ["getSearchedPosts", query, sortBy, hashtagId.toString()],
      };
    } else if (sortBy && !hashtagId) {
      return {
        queryKey: ["getSearchedPosts", query, sortBy],
      };
    } else if (!sortBy && hashtagId) {
      return {
        queryKey: ["getSearchedPosts", query, hashtagId.toString()],
      };
    } else {
      return {
        queryKey: ["getSearchedPosts", query],
      };
    }
  };

  const getSearchedPostsHashtagsQueryKey = ({ query }) => {
  
      return {
        queryKey: ["getSearchedPostsHashtagsQueryKey", query.toString()],
      };
    
  };

  const getAllUserPostsQueryKey = ({ userId, sortBy }) => {
    if (sortBy) {
      return {
        queryKey: ["getAllUserPosts", userId.toString(), sortBy],
      };
    } else {
      return {
        queryKey: ["getAllUserPosts", userId.toString()],
      };
    }
  };

  const getIndividualPostQueryKey = (data) => {
    if (data) {
      const { postId } = data;
      return {
        queryKey: ["getIndividualPost", postId.toString()],
      };
    } else {
      return {
        queryKey: ["getIndividualPost"],
      };
    }
  };
  const getSearchSuggestionsQueryKey = ({ query }) => {
    return {
      queryKey: ["getIndividualPost", query],
    };
  };

  const getUserInfoQueryKey = ({ userId }) => {
    return {
      queryKey: ["getUserInfo", userId.toString()],
    };
  };

  const getAllHashtagsQueryKey = () => {
    return {
      queryKey: ["getAllHashtags"],
    };
  };

    const getPopularHashtagsQueryKey = () => {
    return {
      queryKey: ["getPopularHashtags"],
    };
  };

  const getTopRatedPostsQueryKey = () => {
    return {
      queryKey: ["getTopRatedPosts"],
    };
  };

  return {
    getAllBookmarksQueryKey,
    getAllPostCommentsQueryKey,
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getAllPostsFeedQueryKey,
    getSearchedPostsQueryKey,
    getSearchedPostsHashtagsQueryKey,
    getAllUserPostsQueryKey,
    getIndividualPostQueryKey,
    getSearchSuggestionsQueryKey,
    getUserInfoQueryKey,
    getAllHashtagsQueryKey,
    getPopularHashtagsQueryKey,
    getAllTaggedPostsQueryKey,
    getTopRatedPostsQueryKey,
    getAllBookmarksTagsQueryKey
  };
};
