import React, { forwardRef } from "react";
import { Article } from "./Article";
import { v4 as uuidv4 } from "uuid";
import { useGetAllSearchedPosts } from "@/hooks/posts/useGetAllSearchedPosts";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { NotFound } from "@/components/common/NotFound/NotFound";
import { useSearchParams } from "react-router-dom";
import { FilterSearchResult } from "../FilterSearchResult/FilterSearchResult";
import { SortSearchResult } from "../Header/SortSearchResult/SortSearchResult";
import Header from "../Header/Header";


export const SearchResults = forwardRef(() => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ? searchParams.get("query") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtag = searchParams.get("hashtag") ? searchParams.get("hashtag") : 0;
  const sanitizeQuery = `${query}`.replace(/[^a-zA-Z0-9\s]/g, "");

  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetAllSearchedPosts({
      query: sanitizeQuery,
      sortBy: sort,
      hashtagId: hashtag,
    });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

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
  const allPostHashtags = data.pages.map((item) => item.allPostHashtags)[0];
  const totalPosts = data.pages.map((item) => item.totalPosts)[0];

  return (
    <div className="grid lg:grid-cols-[15rem_auto] gap-4 pt-8">
      <div className="flex justify-between lg:justify-start lg:flex-col gap-4">
        <FilterSearchResult allPostHashtags={allPostHashtags} />
        
        <SortSearchResult />
      </div>
      <div>
        {totalPosts > 0 ? (
          <div className="flex flex-col gap-4">
            <Header totalPosts={totalPosts}/>
            {posts.map((post, i) => {
              return (
                <Article
                  postData={post}
                  key={uuidv4()}
                  ref={totalPosts === i + 1 ? lastElement : null}
                />
              );
            })}
          </div>
        ) : (
          <NotFound>
            <span
              className="font-semibold md:text-fs_base text-fs_small"
              data-test={"no-searched-post-found"}
            >{`No posts found with title "${sanitizeQuery}" !!`}</span>
          </NotFound>
        )}
        {isFetching ? (
          <PostArticleSkeleton
            count={4}
            className="mt-0 md:mx-auto !max-w-[800px] mb-0 p-4 bg-bg-primary"
          />
        ) : null}
      </div>
    </div>
  );
});
