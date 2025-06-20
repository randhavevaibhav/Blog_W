import { useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId :currentUserId} = auth;

  const fetchAllOwnPosts = async () => {
    const res = await axiosPrivate.get(
      `/posts/own/${currentUserId}?offset=0&sort=desc`
    );

    const resData = await res.data;
    return resData;
  };

  const fetchBookmarks = async () => {
    const res = await axiosPrivate.get(`/bookmarks/${currentUserId}`);

    const resData = await res.data;
    return resData;
  };

  const fetchUserInfo = async ({userId}) => {
    const res = await axiosPrivate.get(`/user/${userId}`);
    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;
    return resData;
  };

  const fetchIndiviualPost = async ({ userId,postId, imgURL }) => {
    //passing same userId for current user because they are same

    //fetch image
    if (imgURL) {
      const image = new Image();
      image.src = imgURL;
    }
    let res =null;

    //fetch post
    if(currentUserId)
    {
       res = await axiosPrivate.get(`/post/${currentUserId}/${userId}/${postId}`);
    }else{
      res = await axiosPrivate.get(`/post/${userId}/${postId}`);
    }
  

    const resData = await res.data;

    return resData;
  };

  const preFetchAllOwnPosts = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["getAllOwnPosts", currentUserId.toString(), "desc"],
      queryFn: fetchAllOwnPosts,
    });
  };

  const preFetchBookmarks = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["getAllBookmarks", currentUserId.toString()],
      queryFn: fetchBookmarks,
    });
  };

  const preFetchUserInfo = async ({userId}) => {
    await queryClient.prefetchQuery({
      queryKey: ["getUserInfo", userId.toString()],
      queryFn: ()=>fetchUserInfo({userId}),
    });
  };

  const PreFetchIndiviualPost = async ({ userId,postId, imgURL }) => {
    // console.log("postId ======>",postId)

    // console.log("userId =====> ",userId)

    //pass userId twice as  queryKey because for IndiviualPost reuires two userId's
    // current user and user which created that post
    await queryClient.prefetchQuery({
      queryKey: ["getIndiviualPost", userId.toString(), postId.toString()],
      queryFn: () => fetchIndiviualPost({ userId,postId, imgURL }),
    });
  };



  return {
    preFetchAllOwnPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    PreFetchIndiviualPost,
  };
};
