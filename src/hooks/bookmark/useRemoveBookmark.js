import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

import _ from "lodash";

const mutationLocationList = {
  indiPostPage: "indiPostPage",
  homePage: "homePage",
};

export const useRemoveBookmark = ({
  userId,
  postId,
  currentUserId,
  mutationLocation,
}) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

  const getAllPostsQueryKey = ["getAllPostsFeed"];

  const removeBookmarkService = async () => {
    const res = await axiosPrivate.delete(
      `/bookmarks/${currentUserId}/${postId}`
    );

    const resData = await res.data;
    return resData;
  };

  const updateIndiviualPost = () => {
    const cachedIndPostData = queryClient.getQueryData(
      getIndiviualPostQueryKey
    );
    const clonedCachedIndPostData = _.cloneDeep(cachedIndPostData);
    // console.log("clonedCachedIndPostData ==>", clonedCachedIndPostData);

    clonedCachedIndPostData.postData.postBookmarked = false;

    // console.log("bookmark mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedIndPostData);
    return {
      prevData: cachedIndPostData,
      newData: clonedCachedIndPostData,
    };
  };

  const updateHomePage = () => {
    const cachedData = queryClient.getQueryData(getAllPostsQueryKey);
    const clonedCachedData = _.cloneDeep(cachedData);
    const pages = clonedCachedData.pages;

    // console.log("old  clonedCachedData ===> ", clonedCachedData);

    const updatePost = ({ posts }) => {
      // console.log("posts in updatePost ==> ", posts);
      const updatedPost = posts.map((post) => {
        // console.log("post.postId,postId ==> ", post.postId, postId);
        if (parseInt(post.postId) === parseInt(postId)) {
          // console.log("found match !! ==> ", post.postId);
          return {
            ...post,
            isBookmarked: false,
          };
        } else {
          return {
            ...post,
          };
        }
      });
      return updatedPost;
    };

    const updatePages = ({ pages }) => {
      const updatedPages = pages.map((page) => {
        // console.log("page ==> ", page);
        return {
          ...page,
          posts: updatePost({ posts: page.posts }),
        };
      });
      // console.log("updatedPages ==> ", updatedPages);
      return updatedPages;
    };

    clonedCachedData.pages = updatePages({ pages });

    // console.log("updated  clonedCachedData ===> ", clonedCachedData);
    queryClient.setQueryData(getAllPostsQueryKey, clonedCachedData);

    return {
      prevData: cachedData,
      newData: clonedCachedData,
    };
  };

  const { mutate: removeBookmark, isPending } = useMutation({
    mutationFn: removeBookmarkService,

    onMutate: () => {
      switch (mutationLocation) {
        case mutationLocationList["indiPostPage"]:
          const indiviualPostUpdatedData = updateIndiviualPost();

          return {
            prevData: {
              indiviualPostUpdateData: indiviualPostUpdatedData.prevData,
            },
            newData: {
              indiviualPostUpdateData: indiviualPostUpdatedData.newData,
            },
          };
        case mutationLocationList["homePage"]:
          const homePageUpdatedData = updateHomePage();
          return {
            prevData: {
              homePageUpdateData: homePageUpdatedData.prevData,
            },
            newData: {
              homePageUpdateData: homePageUpdatedData.newData,
            },
          };
        default:
          return {
            prevData: null,
            newData: null,
          };
      }
    },

    onError: (err, variables, context) => {
      if (mutationLocation === "indiPostPage") {
        queryClient.setQueryData(
          getIndiviualPostQueryKey,
          context.prevData.indiviualPostUpdateData
        );
      }
      if (mutationLocation === "homePage") {
        queryClient.setQueryData(
          getAllPostsQueryKey,
          context.prevData.homePageUpdateData
        );
      }
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
        //console.log(err);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ["getAllBookmarks", currentUserId.toString(), "desc"],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllBookmarks", currentUserId.toString(), "asc"],
        });
      }
    },
  });

  return {
    removeBookmark,
    isPending,
  };
};
