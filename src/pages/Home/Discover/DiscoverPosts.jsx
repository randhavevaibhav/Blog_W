import { ArticleSection } from "@/components/Home/ArticleSection/ArticleSection";
import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import React from "react";
import Error from "../../Error/Error";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";

export const DiscoverPosts = ({}) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
  } = useGetAllPosts();

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  if (isError) {
    console.error(error);
    return <Error>Error while loading discover posts page !</Error>;
  }
  if (isLoading) {
    return (
      <>
        <PostArticleSkeleton count={4} />
      </>
    );
  }

  const postData = data.pages.map((item) => item.posts).flat();
  const totalPosts = postData.length;
  if (totalPosts <= 0) {
    return <PageNotFound>No posts found !</PageNotFound>;
  }
  return (
    <div data-test={`discover-posts-page`}>
      <ArticleSection
        ref={lastElement}
        postData={postData}
        mutationLocation={"Discover"}
      />
      {isFetching ? <PostArticleSkeleton count={4} className="mt-3" /> : null}
    </div>
  );
};
