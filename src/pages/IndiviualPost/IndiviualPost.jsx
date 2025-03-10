import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";

import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/auth/useAuth";
import { useGetAllPostComments } from "../../hooks/comments/useGetAllPostComments";
import { useGetTotalPostLikes } from "../../hooks/likes/useGetTotalPostLikes";

export const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
    isSuccess,
  } = useGetIndiviualPost();
  const { isPending: isFetchCommentsPending, data: commentsData } =
    useGetAllPostComments();
  const { isPending: isFetchTotalLikesPending, data: totalLikesData } =
    useGetTotalPostLikes();

  const isFetchFullPostPending =
    isFetchIndviPostPending ||
    isFetchCommentsPending ||
    isFetchTotalLikesPending;

  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const userId = auth.userId;
  const { postId } = useParams();
  if (isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["getAllPostComments", userId, postId],
    });
  }

  if (isError) {
    return <ErrorText>Error while loading post !</ErrorText>;
  }

  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
        {isFetchFullPostPending ? (
          <LoadingWithText>Loading post ...</LoadingWithText>
        ) : (
          <MainArticle
            userName={data.postData.userName}
            imgURL={data.postData.title_img_url}
            content={data.postData.content}
            postTitle={data.postData.title}
            createdAt={data.postData.created_at}
            commentsData={commentsData}
            totalLikesData={totalLikesData}
          />
        )}
      </MainLayout>
    </>
  );
};
