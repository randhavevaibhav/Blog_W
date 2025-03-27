import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Article } from "../Article/Article";
import { LoadingWithText } from "../../common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../common/ErrorText/ErrorText";
import { useGetAllPosts } from "../../../hooks/posts/useGetAllPosts";
import { v4 as uuidv4 } from "uuid";

export const ArticleSection = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetAllPosts();

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

  if (error) {
    return <ErrorText>Error while Loading posts</ErrorText>;
  }
  if (isLoading) {
    return <LoadingWithText>Loading posts ...</LoadingWithText>;
  }

  const postData = data.pages.map((item) => JSON.parse(item.posts)).flat();

  // console.log("postData ===> ",postData)
  return (
    <>
      <div className="article_list flex flex-col gap-4 p-4 h-screen overflow-auto">
        {postData.map((post, i) => (
          <Article
            postData={post}
            key={uuidv4()}
            ref={postData.length === i + 1 ? lastElement : null}
          />
        ))}

        {isFetching && <div>Fetching more data...</div>}
      </div>
    </>
  );
};
