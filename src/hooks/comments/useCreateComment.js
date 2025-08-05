import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import {cloneDeep} from "lodash-es";
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

  const updateCommentCountOnPostAnalytics = () => {
    const cachedData = queryClient.getQueryData(
      getPostAnalyticsQueryKey({
        userId,
        postId,
      }).queryKey
    );

    const clonedCachedData = cloneDeep(cachedData);

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

  const createComments = ({
    page,
    parentId,
    commentData,
    isUpdated = false,
  }) => {
    // console.log("isUpdated ==> ",isUpdated)
    // console.log(" updateComments ===> ");
    const createComment = ({ comments }) => {
      comments.forEach((comment) => {
        // console.log("commentId ===> ", comment.commentId);
        // console.log("parentId ===> ", parentId);
        if (parseInt(comment.commentId) === parseInt(parentId)) {
          // console.log("found match !!");
          if (isUpdated) {
            comment.replies[0] = {
              ...comment.replies[0],
              ...commentData,
              replies: [],
              userName,
              userProfileImg,
              isUpdated,
            };

            //  console.log("comment.replies[0] ===> ",comment.replies[0])
            return comment.replies[0];
          } else {
            return comment.replies.unshift({
              ...commentData,
              userName,
              userProfileImg,
              isCmtLikedByUser: false,
              replies: [],
              isUpdated,
            });
          }
        } else if (comment.replies.length > 0) {
          return createComment({ comments: comment.replies });
        }

        return comment;
      });
    };

    const updatePage = ({ page }) => {
      createComment({ comments: page.comments });
    };

    const cachedData = queryClient.getQueryData(
      getAllPostCommentsQueryKey({
        postId,
        sortBy,
      }).queryKey
    );

    // console.log("cachedData ====>", cachedData);
    let clonedCachedData = cloneDeep(cachedData);

    if (!clonedCachedData) {
      //first time post comment
      // console.log("No cahced data ");
      clonedCachedData = {
        pageParams: [],
        pages: [
          {
            comments: [
              {
                ...commentData,
                userName,
                userProfileImg,
                isCmtLikedByUser: false,
                replies: [],
                isUpdated,
              },
            ],
          },
        ],
      };
    } else {
      if (parentId === null) {
        if (isUpdated) {
          clonedCachedData.pages[0].comments[0] = {
            ...clonedCachedData.pages[0].comments[0],
            ...commentData,
            userName,
            userProfileImg,
            replies: [],
            isUpdated,
          };
        } else {
          clonedCachedData.pages[0].comments.unshift({
            ...commentData,
            userName,
            userProfileImg,
            isCmtLikedByUser: false,
            replies: [],
            isUpdated,
          });
        }
      } else {
        updatePage({ page: clonedCachedData.pages[page] });
      }
    }

    queryClient.setQueryData(
      getAllPostCommentsQueryKey({
        postId,
        sortBy,
      }).queryKey,
      clonedCachedData
    );

    return { prevData: cachedData, newData: clonedCachedData };
  };

  const { mutate: createComment, isPending } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: createCommentService,
    onMutate: (data) => {
      try {
        const parentId = data.parentId;
        const page = data.page;

        const optimisticUpdateCommentCountOnIndiPostResult =
          updateCommentCountOnPostAnalytics();

        const optimisticCommentsUpdate = createComments({
          parentId,
          page,
          commentData: data,
          isUpdated: false,
        });

        const optimsticUpdates = {
          prevData: {
            IndividualPost:
              optimisticUpdateCommentCountOnIndiPostResult.prevData,
            comments: optimisticCommentsUpdate.prevData,
          },
          newData: {
            IndividualPost:
              optimisticUpdateCommentCountOnIndiPostResult.newData,
            comments: optimisticCommentsUpdate.newData,
          },
        };

        return optimsticUpdates;
      } catch (err) {
        console.error("error while creating comment ==> ", err);
      }
      // console.log("data ==> ", data);
    },
    onSuccess: (res) => {
      const parentId = res.comment.parentId;
      const page = res.comment.page;
      const commentData = res.comment;

      createComments({
        parentId,
        page,
        commentData,
        isUpdated: true,
      });
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(
        getPostAnalyticsQueryKey({
          userId,
          postId,
        }).queryKey,
        context.prevData.IndividualPost
      );
      queryClient.setQueryData(
        getAllPostCommentsQueryKey({
          postId,
          sortBy,
        }).queryKey,
        context.prevData.comments
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
