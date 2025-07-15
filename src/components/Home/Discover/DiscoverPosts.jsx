import { ArticleSection } from "@/components/Home/ArticleSection/ArticleSection";

import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import React from "react";
import Error from "../../../pages/Error/Error";
import Loading from "../../../pages/Loading/Loading";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";

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

 const {lastElement} = useInfiniteQueryCntrObserver({
      hasNextPage,isFetching,isLoading,fetchNextPage
    })

  if (isError) {
    console.error(error);
    return <Error>Error while loading discover posts page !</Error>;
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
        mutationLocation={"Discover"}
      />
      {isFetching && <LoadingTextWithSpinner>Fetching more posts...</LoadingTextWithSpinner>}
    </div>
  );
};
