import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
import { commentsServices } from "@/services/comments/commentsServices";

export const useCreateComment = ({ sortBy }) => {
  const queryClient = useQueryClient();
  const {createCommentService} = commentsServices();
  const { userId, postId } = useParams();
  const { auth } = useAuth();

  const { userName, userProfileImg } = auth;

  //  const sortCmtBy = "desc"

  const currentUserId = auth.userId;

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    userId.toString(),
    postId.toString(),
  ];

  const getAllPostCommentsQueryKey = [
    "getAllPostComments",
    postId.toString(),
    userId.toString(),
    sortBy,
  ];

  // const createCommentService = async (formData) => {
  //   const res = await axiosPrivate.post(`/comment`, formData);

  //   const resData = await res.data;
  //   return resData;
  // };

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onMutate: (data) => {
      // console.log("data ==> ",data)
      const updateCommentCountOnIndiPost = () => {
        const cachedData = queryClient.getQueryData(getIndiviualPostQueryKey);

        const clonedCachedData = _.cloneDeep(cachedData);

        clonedCachedData.postData.totalComments =
          Number(clonedCachedData.postData.totalComments) + 1;

        // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

        queryClient.setQueryData(getIndiviualPostQueryKey, clonedCachedData);

        return { prevData: cachedData, newData: clonedCachedData };
      };

      const OptimisticUpdateCommentCountOnIndiPostResult =
        updateCommentCountOnIndiPost();

      const optimsticUpdates = {
        prevData: {
          IndiviualPost: OptimisticUpdateCommentCountOnIndiPostResult.prevData,
        },
        newData: {
          IndiviualPost: OptimisticUpdateCommentCountOnIndiPostResult.newData,
        },
      };

      return optimsticUpdates;
    },
    onSuccess: (res) => {
      toast.success(`Success !! comment submitted.`);

     
      const parentId = res.comment.parentId;
      // console.log("parentId upper ===> ", parentId);
      const cachedData = queryClient.getQueryData(getAllPostCommentsQueryKey);

      // console.log("cachedData ====>", cachedData);
      let clonedCachedData = _.cloneDeep(cachedData);
     

      // console.log("clonedCachedData.pages ====>", pages);

      const updateComment = ({ comments }) => {
        comments.forEach((comment) => {
          // console.log("commentId ===> ", comment.commentId);
          // console.log("parentId ===> ", parentId);
          if (parseInt(comment.commentId) === parseInt(parentId)) {
            // console.log("found match !!");
            return comment.replies.unshift({
              ...res.comment,
              userName,
              userProfileImg,
              isCmtLikedByUser: false,
              replies: [],
            });
          } else if (comment.replies.length > 0) {
            return updateComment({ comments: comment.replies });
          }

          return comment;
        });
      };

      const updatePages = ({ pages }) => {
        const updatedPages = pages.map((page) => {
          updateComment({ comments: page.comments });

          return page;
        });
        return updatedPages;
      };

      ////////// update comment starts /////

      if (!clonedCachedData) {   //first time post comment
        // console.log("No cahced data ")
        clonedCachedData = {
          pageParams:[],
          pages:[{
            comments:[{
              ...res.comment,
              userName,
              userProfileImg,
              isCmtLikedByUser: false,
              replies: [],
            }]
          }]
        }
      } else {
        if (parentId === null) {
          // console.log("parentId null ");
          // console.log(
          //   " clonedCachedData.pages[0] ====> ",
          //   clonedCachedData.pages[0]
          // );
          clonedCachedData.pages[0].comments.unshift({
            ...res.comment,
            userName,
            userProfileImg,
            isCmtLikedByUser: false,
            replies: [],
          });
        } else {
          const updatedPages = updatePages({ pages: clonedCachedData.pages });

          // console.log("updatedPages ===> ", updatedPages);
          clonedCachedData.pages = updatedPages;
        }
      }

      // console.log("updated  clonedCachedData  ===> ", clonedCachedData);

      queryClient.setQueryData(getAllPostCommentsQueryKey, clonedCachedData);
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getIndiviualPostQueryKey,
        context.prevData.IndiviualPost
      );

      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ["getAllOwnPosts", currentUserId.toString()],
        });

        // queryClient.invalidateQueries({
        //   queryKey: [
        //     "getAllPostComments",
        //     postId.toString(),
        //     userId.toString(),
        //   ],
        // });
      }
    },
  });

  return {
    createComment,
    isPending,
  };
};
