import { useGetAllFollowingUsersPosts } from "@/hooks/posts/useGetAllFollowingUsersPosts";
import Error from "@/pages/Error/Error";
import Loading from "@/pages/Loading/Loading";
import React from "react";
import { ArticleSection } from "../ArticleSection/ArticleSection";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";

export const FollowingPosts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
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
  if (isLoading) {
    return <Loading>Loading posts...</Loading>;
  }

  const postData = data.pages.map((item) => item.posts).flat();
  const totalPosts = postData.length;
  if (totalPosts <= 0) {
    return <PageNotFound>No posts found !</PageNotFound>;
  }

  return (
    <div>
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
