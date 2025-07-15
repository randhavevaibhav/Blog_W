export const useQueryKey = () => {
  const getAllBookmarksQueryKey = ({ userId, sortBy }) => {
    if (sortBy) {
      return {
        queryKey: ["getAllBookmarks", userId.toString(), sortBy],
      };
    } else {
      return {
        queryKey: ["getAllBookmarks", userId.toString()],
      };
    }
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

  const getAllFollowersQueryKey = ({ userId }) => {
    return {
      queryKey: ["getAllFollowers", userId.toString()],
    };
  };

  const getAllFollowingsQueryKey = ({ userId }) => {
    return {
      queryKey: ["getAllFollowings", userId.toString()],
    };
  };

  const getAllFollowingUsersPostsQueryKey = ({ userId }) => {
    return {
      queryKey: ["getAllFollowingUsersPosts", userId.toString()],
    };
  };

  const getAllPostsFeedQueryKey = () => {
    return {
      queryKey: ["getAllPostsFeed"],
    };
  };

   const getAllTaggedPostsQueryKey = ({hashtagId}) => {
    return {
      queryKey: ["getAllTaggedPosts",hashtagId],
    };
  };

  const getAllSearchedPostsQueryKey = ({ query, sortBy }) => {
    if (sortBy) {
      return {
        queryKey: ["getAllSearchedPosts", query, sortBy],
      };
    } else {
      return {
        queryKey: ["getAllSearchedPosts", query],
      };
    }
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
      const {userId,postId} = data
      return {
        queryKey: ["getIndividualPost", userId.toString(), postId.toString()],
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

  const getUserStatQueryKey = ({ userId }) => {
    return {
      queryKey: ["getUserStat", userId.toString()],
    };
  };

  const getAllHashtagsQueryKey = () => {
    return {
      queryKey: ["getAllHashtags"],
    };
  };

  return {
    getAllBookmarksQueryKey,
    getAllPostCommentsQueryKey,
    getAllFollowersQueryKey,
    getAllFollowingsQueryKey,
    getAllFollowingUsersPostsQueryKey,
    getAllPostsFeedQueryKey,
    getAllSearchedPostsQueryKey,
    getAllUserPostsQueryKey,
    getIndividualPostQueryKey,
    getSearchSuggestionsQueryKey,
    getUserInfoQueryKey,
    getUserStatQueryKey,
    getAllHashtagsQueryKey,
    getAllTaggedPostsQueryKey
  };
};
