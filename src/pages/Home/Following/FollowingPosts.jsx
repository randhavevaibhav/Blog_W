import { useGetAllFollowingUsersPosts } from "@/hooks/posts/useGetAllFollowingUsersPosts";
import Error from "@/pages/Error/Error";
import Loading from "@/pages/Loading/Loading";
import React from "react";
import { ArticleSection } from "../../../components/Home/ArticleSection/ArticleSection";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";

export const FollowingPosts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isRefetching,
  } = useGetAllFollowingUsersPosts();

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  if (isError) {
    console.error(error);
    return <Error>Error while loading following posts page !</Error>;
  }
  if (isLoading || isRefetching) {
    return (
      <>
        <div className="flex flex-col space-y-3">
          <PostArticleSkeleton count={4} />
        </div>
      </>
    );
  }

  const postData = data.pages.map((item) => item.posts).flat();
  const totalPosts = postData.length;
  if (totalPosts <= 0) {
    return <PageNotFound>No posts found !</PageNotFound>;
  }

  console.log("isRefetching ==> ", isRefetching);

  return (
    <div data-test={`following-posts-page`}>
      <ArticleSection
        ref={lastElement}
        postData={postData}
        mutationLocation={"Following"}
      />
      {isFetching && (
        <LoadingTextWithSpinner>Fetching more posts...</LoadingTextWithSpinner>
      )}
    </div>
  );
};
