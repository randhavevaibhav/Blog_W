import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";

import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

import { useGetAllPostComments } from "../../hooks/comments/useGetAllPostComments";
import { useGetTotalPostLikes } from "../../hooks/likes/useGetTotalPostLikes";

export const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
  } = useGetIndiviualPost();
  const { isPending: isFetchCommentsPending, data: commentsData } =
    useGetAllPostComments();
  const { isPending: isFetchTotalLikesPending, data: totalLikesData } =
    useGetTotalPostLikes();

  const isFetchFullPostPending =
    isFetchIndviPostPending ||
    isFetchCommentsPending ||
    isFetchTotalLikesPending;

  if (isError) {
    return (
      <MainLayout>
        <ErrorText>Error while loading post !</ErrorText>
      </MainLayout>
    );
  }

  if (isFetchFullPostPending) {
    return <LoadingWithText>Loading post ...</LoadingWithText>;
  }

  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
        <MainArticle
          userName={data.postData.userName}
          imgURL={data.postData.title_img_url}
          content={data.postData.content}
          postTitle={data.postData.title}
          createdAt={data.postData.created_at}
          commentsData={commentsData}
          totalLikesData={totalLikesData}
        />
      </MainLayout>
    </>
  );
};
