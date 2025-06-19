import { useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId } = auth;

  const fetchAllOwnPosts = async () => {
    const res = await axiosPrivate.get(
      `/posts/own/${userId}?offset=0&sort=desc`
    );

    const resData = await res.data;
    return resData;
  };

  const fetchBookmarks = async () => {
    const res = await axiosPrivate.get(`/bookmarks/${userId}`);

    const resData = await res.data;
    return resData;
  };

  const fetchUserInfo = async () => {
    const res = await axiosPrivate.get(`/user/${userId}`);
    // console.log("response from axiosPrivate ===> ", res);
    const resData = await res.data;
    return resData;
  };

  const fetchIndiviualPost = async ({ postId, imgURL }) => {
    //passing same userId for current user because they are same

    //fetch image
    console.log("calling fetchIndiviualPost");
    const image = new Image();
    image.src = imgURL;
    //fetch post
    const res = await axiosPrivate.get(`/post/${userId}/${userId}/${postId}`);
    console.log("res fetchIndiviualPost ===> ", res);
    const resData = await res.data;

    return resData;
  };



  const preFetchAllOwnPosts = async () => {
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["getAllOwnPosts", userId.toString(), "desc"],
      queryFn: fetchAllOwnPosts,
    });
  };

  const preFetchBookmarks = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["getAllBookmarks", userId.toString()],
      queryFn: fetchBookmarks,
    });
  };

  const preFetchUserInfo = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["getUserInfo", userId.toString()],
      queryFn: fetchUserInfo,
    });
  };

  const PreFetchPost = async ({ postId, imgURL }) => {
    
    // console.log("postId ======>",postId)

    // console.log("userId =====> ",userId)

    //pass userId twice as  queryKey because for IndiviualPost reuires two userId's
    // current user and user which created that post
    await queryClient.prefetchQuery({
      queryKey: ["getIndiviualPost", userId.toString(), postId.toString()],
      queryFn: () => fetchIndiviualPost({ postId, imgURL }),
    });
  };



  return {
    preFetchAllOwnPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    PreFetchPost
  };
};
