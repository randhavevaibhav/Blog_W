import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { cloneDeep, random } from "lodash-es";
import { commentsServices } from "@/services/comments/commentsServices";
import { useQueryKey } from "../utils/useQueryKey";

export const useCreateComment = ({ sortBy }) => {
  const queryClient = useQueryClient();
  const { createCommentService } = commentsServices();
  const {
    getAllPostCommentsQueryKey,
    getUserInfoQueryKey,
    getIndividualPostQueryKey,
    getAllUserPostsQueryKey,
  } = useQueryKey();
  const { postId } = useParams();
  const { auth } = useAuth();

  const { userName, userProfileImg } = auth;

  //  const sortCmtBy = "desc"

  const currentUserId = auth.userId;

  const updateCommentCountOnIndividualPostQuery = () => {
    const cachedData = queryClient.getQueryData(
      getIndividualPostQueryKey({
        postId,
      }).queryKey
    );

    const clonedCachedData = cloneDeep(cachedData);

    clonedCachedData.postData.totalComments =
      Number(clonedCachedData.postData.totalComments) + 1;

    // console.log("comment mutation updatedCacheData ==>", clonedCachedData);

    queryClient.setQueryData(
      getIndividualPostQueryKey({
        postId,
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
        const cachedData = queryClient.getQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy,
          }).queryKey
        );

        // console.log("cachedData ====>", cachedData);
        let clonedCachedData = cloneDeep(cachedData);
        const targetPage = clonedCachedData.pages[page];

        const tempId = `@tempId_${parentId ? parentId : ""}`;
        // console.log("parentId in onMutate ==> ", parentId);
        // console.log("page in onMutate ==> ", page);
        // console.log("targetPage in onMutate ==> ", targetPage);

        targetPage.comments = {
          [tempId]: {
            content: data.content,
            userId: currentUserId,
            userName: userName,
            postId: data.postId,
            createdAt: data.createdAt,
            parentId: data.parentId,
            commentId: tempId + random(9),
            userProfileImg,
            isCmtUpdated: false,
            isCmtLikedByUser: false,
            depth: !parentId
              ? 0
              : targetPage.comments[`@${parentId}`].depth + 1,
            likes: 0,
            page: page,
            replies: [],
          },
          ...targetPage.comments,
        };

        // console.log("parentId in onMutate ==> ", parentId);
        // console.log("tempId in onMutate ==> ", tempId);
        if (parentId) {
          targetPage.comments[`@${parentId}`].replies.unshift(tempId);
        } else {
          targetPage.commentsIds.unshift(tempId);
        }

        //  console.log("clonedCachedData in onMutate  ====>", clonedCachedData);

        queryClient.setQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy,
          }).queryKey,
          clonedCachedData
        );

        const optimisticUpdateCommentCountOnIndiPostResult =
          updateCommentCountOnIndividualPostQuery();
        return {
          prevData: {
            IndividualPost:
              optimisticUpdateCommentCountOnIndiPostResult.prevData,
            comments: cachedData,
          },
          newData: {
            IndividualPost:
              optimisticUpdateCommentCountOnIndiPostResult.newData,
            comments: clonedCachedData,
          },
        };
      } catch (err) {
        console.error("error while creating comment ==> ", err);
      }
      // console.log("data ==> ", data);
    },
    onSuccess: (res) => {
      try {
        const { page, parentId, commentId } = res.comment;
        const tempId = `@tempId_${parentId ? parentId : ""}`;
        const cachedData = queryClient.getQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy,
          }).queryKey
        );
        let clonedCachedData = cloneDeep(cachedData);

        const targetPage = clonedCachedData.pages[page];

        //update comment
        targetPage.comments[`@${commentId}`] = {
          ...targetPage.comments[tempId],
          isCmtUpdated: true,
          commentId: commentId,
        };

        delete targetPage.comments[tempId];

        //update parent comment replies array
        if (parentId) {
          targetPage.comments[`@${parentId}`].replies.shift();
          targetPage.comments[`@${parentId}`].replies.unshift(`@${commentId}`);
        } else {
          targetPage.commentsIds.shift();
          targetPage.commentsIds.unshift(`@${commentId}`);
        }
        queryClient.setQueryData(
          getAllPostCommentsQueryKey({
            postId,
            sortBy,
          }).queryKey,
          clonedCachedData
        );

        // console.log("clonedCachedData in OnSuccess =>> ", clonedCachedData);
        return { prevData: cachedData, newData: clonedCachedData };
      } catch (error) {
        console.log("Error while updating comment after onSuccess".error);
      }
    },

    onError: (err, variables, context) => {
      try {
        queryClient.setQueryData(
          getIndividualPostQueryKey({
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
      } catch (error) {
        console.log(
          "Error in onError callback of useCreateComment hook ",
          error
        );
      }
    },
    onSettled: () => {
      try {
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
        }
      } catch (error) {
        console.log(
          "Error in onSettled callback of useCreateComment hook ",
          error
        );
      }
    },
  });

  return {
    createComment,
    isPending,
  };
};
