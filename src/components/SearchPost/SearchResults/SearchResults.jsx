import React, { forwardRef } from "react";
import { Article } from "./Article";
import { v4 as uuidv4 } from "uuid";
import { useGetAllSearchedPosts } from "@/hooks/posts/useGetAllSearchedPosts";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";

export const SearchResults = forwardRef(({ query, sortBy }, ref) => {

  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetAllSearchedPosts({ query, sortBy });

   const {lastElement} = useInfiniteQueryCntrObserver({
        hasNextPage,isFetching,isLoading,fetchNextPage
      })

  if (isError) {
    return <ErrorText>Error while loading search results !!</ErrorText>;
  }
  if (isLoading) {
    return (
      <LoadingTextWithSpinner direction="center">
        Loading posts...
      </LoadingTextWithSpinner>
    );
  }

  const posts = data.pages.map((item) => item.posts).flat();
  
  return (
    <>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-4">
         
          {posts.map((post, i) => {
            return (
              <Article
                postData={post}
                key={uuidv4()}
                ref={posts.length === i + 1 ? lastElement : null}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="font-extrabold text-fs_3xl">{`No posts found with title "${query}" !!`}</h2>
      )}
      {isFetching ? (
        <LoadingTextWithSpinner>Fetching posts ...</LoadingTextWithSpinner>
      ) : null}
    </>
  );
});
