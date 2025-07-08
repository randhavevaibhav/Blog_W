import { ArticleSection } from "@/components/Home/ArticleSection/ArticleSection";

import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import React, { useCallback, useRef } from "react";
import Error from "../../../pages/Error/Error";
import Loading from "../../../pages/Loading/Loading";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";

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

  const handleObserver = useRef();
  const lastElement = useCallback(
    (element) => {
      if (isLoading) return;
      if (handleObserver.current) handleObserver.current.disconnect();
      handleObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (element) handleObserver.current.observe(element);
    },
    [isLoading, hasNextPage]
  );

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
      {isFetching && <div>Fetching more data...</div>}
    </div>
  );
};
