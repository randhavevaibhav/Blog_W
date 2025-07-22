import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import _ from "lodash";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useCreateComment = ({ sortBy }) => {
  const queryClient = useQueryClient();
  const { createCommentService } = commentsServices();
  const {
    getAllPostCommentsQueryKey,
    getPostAnalyticsQueryKey,
    getUserInfoQueryKey,
    getUserStatQueryKey,
    getAllUserPostsQueryKey,
  } = useQueryKey();
  const { userId, postId } = useParams();
  const { auth } = useAuth();

  const { userName, userProfileImg } = auth;

  //  const sortCmtBy = "desc"

  const currentUserId = auth.userId;

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onMutate: (data) => {
      // console.log("data ==> ",data)
      const updateCommentCountOnPostAnalytics = () => {
        const cachedData = queryClient.getQueryData(
          getPostAnalyticsQueryKey({
            userId,
            postId,
          }).queryKey
        );

        const clonedCachedData = _.cloneDeep(cachedData);

        clonedCachedData.postAnalytics.totalComments =
          Number(clonedCachedData.postAnalytics.totalComments) + 1;

        // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

        queryClient.setQueryData(
          getPostAnalyticsQueryKey({
            userId,
            postId,
          }).queryKey,
          clonedCachedData
        );

        return { prevData: cachedData, newData: clonedCachedData };
      };

      const OptimisticUpdateCommentCountOnIndiPostResult =
        updateCommentCountOnPostAnalytics();

      const optimsticUpdates = {
        prevData: {
          IndividualPost: OptimisticUpdateCommentCountOnIndiPostResult.prevData,
        },
        newData: {
          IndividualPost: OptimisticUpdateCommentCountOnIndiPostResult.newData,
        },
      };

      return optimsticUpdates;
    },
    onSuccess: (res) => {
      const parentId = res.comment.parentId;
      const page = res.comment.page;
      // console.log("parentId upper ===> ", parentId);
      const cachedData = queryClient.getQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy,
        }).queryKey
      );

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

      const updatePage = ({ page }) => {
        updateComment({ comments: page.comments });
      };

      ////////// update comment starts /////

      if (!clonedCachedData) {
        //first time post comment
        // console.log("No cahced data ")
        clonedCachedData = {
          pageParams: [],
          pages: [
            {
              comments: [
                {
                  ...res.comment,
                  userName,
                  userProfileImg,
                  isCmtLikedByUser: false,
                  replies: [],
                },
              ],
            },
          ],
        };
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
          updatePage({ page: clonedCachedData.pages[page] });
        }
      }

      // console.log("updated  clonedCachedData  ===> ", clonedCachedData);

      queryClient.setQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy,
        }).queryKey,
        clonedCachedData
      );
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey,
        context.prevData.IndividualPost
      );

      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
      }
    },
    onSettled: () => {
      if (currentUserId) {
        queryClient.invalidateQueries({
          queryKey: getAllUserPostsQueryKey({
            userId: currentUserId,
          }).queryKey,
        });

        queryClient.invalidateQueries({
          queryKey: getUserInfoQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: getUserStatQueryKey({
            userId: currentUserId,
          }).queryKey,
        });
      }
    },
  });

  return {
    createComment,
    isPending,
  };
};
