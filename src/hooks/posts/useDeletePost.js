import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export const useDeletePost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

 
  const deletePostService = async (postId) => {
    const res = await axiosPrivate.delete(`/post/delete/${postId}`);
    const resData = await res.data;
    return resData;
  };

  const {
    isPending,
    isSuccess,
    data,
    error,
    isError,
    mutate: deletePost,
  } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostService,

    onMutate: (postId) => {
      //If you want to delete post via cache
      // // console.log("postId ==> ",postId)
      // const cachedPostsData = queryClient.getQueryData(getAllOwnPostsQuerKey);
      // // console.log("cachedPostsData ==> ", cachedPostsData);
      // const clonedCachedPostsData = _.cloneDeep(cachedPostsData);
      // // console.log("clonedCachedPostsData ==> ", clonedCachedPostsData);
      // const pages = clonedCachedPostsData.pages.map((item) =>
      //   JSON.parse(item.posts)
      // );
      // // console.log("pages ==> ", pages);
      // const postToDelete = pages
      //   .map((page, i) => {
      //     return {
      //       page: i,
      //       post: page.find((post) => {
      //         return post.id === postId;
      //       }),
      //     };
      //   })
      //   .reduce((acc, page) => {
      //     if (page.post !== undefined) {
      //       acc = page;
      //     }
      //     return acc;
      //   }, {});
      // const targetPage = clonedCachedPostsData.pages[postToDelete.page];
      // const targetPagePosts =  JSON.parse(targetPage.posts);
      // const filteredTargetPosts = targetPagePosts.filter((post)=>post.id!==postId)
      // targetPage.posts = JSON.stringify(filteredTargetPosts)
      // targetPage.total_post_count = Number(targetPage.total_post_count) - 1;
      // targetPage.total_post_comments = Number(targetPage.total_post_comments) - Number(postToDelete.post.totalComments);
      // targetPage.total_likes_count = Number(targetPage.total_likes_count) - Number(postToDelete.post.likes);
      // // console.log("postToDelete ==> ", postToDelete);
      // // console.log("targetPage ==> ",targetPage)
      // //  console.log("targetPagePosts ==> ",targetPagePosts)
      // //  console.log("filteredTargetPosts ==> ",filteredTargetPosts)
      //  clonedCachedPostsData.pages[postToDelete.page] = targetPage
      // queryClient.setQueryData(getAllOwnPostsQuerKey, clonedCachedPostsData);
      // return { prevData: cachedPostsData, newData: clonedCachedPostsData };
    },
    onSuccess: (res) => {
      toast.success(`post deleted successfully !`);
    },
    onError: (err, variables, context) => {
      // queryClient.setQueryData(getAllOwnPostsQuerKey, context.prevData);
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: () => {
      navigate("/dashboard");
      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", userId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", userId.toString()],
      });
    
    },
  });

  return { deletePost, isPending, data, error, isError, isSuccess };
};
