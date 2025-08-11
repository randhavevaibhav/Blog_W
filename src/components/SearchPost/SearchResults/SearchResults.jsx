import React, { forwardRef, useCallback } from "react";
import { Article } from "./Article";
import { v4 as uuidv4 } from "uuid";
import { useGetAllSearchedPosts } from "@/hooks/posts/useGetAllSearchedPosts";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { NotFound } from "@/components/common/NotFound/NotFound";
import { throttle } from "@/utils/utils";

export const SearchResults = forwardRef(({ query, sortBy }, ref) => {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetAllSearchedPosts({ query, sortBy });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });
    const throttlePrefetch = useCallback(throttle({cb:(prefetchFn)=>prefetchFn()}))

  if (isError) {
    return <ErrorText>Error while loading search results !!</ErrorText>;
  }
  if (isLoading) {
    return (
      <div className={`mt-0 md:mx-auto !max-w-[700px] mb-0 p-4 bg-bg-primary`}>
        <PostArticleSkeleton count={4} />
      </div>
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
                throttlePrefetch={throttlePrefetch}
              />
            );
          })}
        </div>
      ) : (
        <NotFound>
          <span className="font-semibold md:text-fs_base text-fs_small">{`No posts found with title "${query}" !!`}</span>
        </NotFound>
      )}
      {isFetching ? (
        <PostArticleSkeleton
          count={4}
          className="mt-0 md:mx-auto !max-w-[800px] mb-0 p-4 bg-bg-primary"
        />
      ) : null}
    </>
  );
});
