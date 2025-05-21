import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";
import _ from "lodash";

export const useDeletePost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();

  const getAllOwnPostsQuerKey = ["getAllOwnPosts", userId.toString()];

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
      // console.log("postId ==> ",postId)
      const cachedPostsData = queryClient.getQueryData(getAllOwnPostsQuerKey);
      // console.log("cachedPostsData ==> ", cachedPostsData);
      const clonedCachedPostsData = _.cloneDeep(cachedPostsData);
      // console.log("clonedCachedPostsData ==> ", clonedCachedPostsData);
      const allPosts = JSON.parse(clonedCachedPostsData.posts);
      // console.log("allPosts ==> ", allPosts);
      const filteredPosts = allPosts.filter((post) => post.id != postId);

      clonedCachedPostsData.posts =JSON.stringify(filteredPosts);
      queryClient.setQueryData(getAllOwnPostsQuerKey, clonedCachedPostsData);

        return { prevData: cachedPostsData, newData: clonedCachedPostsData };
    },
    onSuccess: (res) => {
      toast.success(`post deleted successfully !`);
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(getAllOwnPostsQuerKey, context.prevData);
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: () => {
     
      queryClient.invalidateQueries({
        queryKey: ["getUserInfo", userId.toString()],
      });
    },
  });

  return { deletePost, isPending, data, error, isError, isSuccess };
};
