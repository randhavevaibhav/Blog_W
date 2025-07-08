import { useGetAllFollowingUsersPosts } from "@/hooks/posts/useGetAllFollowingUsersPosts";
import Error from "@/pages/Error/Error";
import Loading from "@/pages/Loading/Loading";
import React, { useCallback, useRef } from "react";
import { ArticleSection } from "../ArticleSection/ArticleSection";

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
    return <Error>Error while loading following posts page !</Error>;
  }
  if (isLoading) {
    return <Loading>Loading posts...</Loading>;
  }

  const postData = data.pages.map((item) => item.posts).flat();
  
  return (
    <div>
      <ArticleSection ref={lastElement} postData={postData} mutationLocation={"Following"}/>
      {isFetching && <div>Fetching more data...</div>}
    </div>
  );
};
