import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { ArticleSection } from "./components/ArticleSection/ArticleSection";
import { useGetAllTaggedPosts } from "@/hooks/posts/useGetAllTaggedPosts";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { useScrollToTop } from "@/hooks/utils/useScrollToTop";
import React from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "@/components/common/NotFound/NotFound";
import { capitalize } from "lodash-es";

import { FilterHomePosts } from "@/pages/Home/components/FilterHomePosts/FilterHomePosts";
import { BackButton } from "@/components/common/BackButton/BackButton";


const TaggedPostsHeading = () => {
  const { hashtagName,hashtagColor } = useParams();

  return (
    <header>
    <div className="flex lg:justify-between lg:flex-row flex-col  lg:items-center">
       <BackButton className="flex-none self-start"/>
      <FilterHomePosts/>
    </div>
      <h1
        className="text-fs_3xl font-semibold md:py-6 py-4 tracking-wide"
        data-test={`tagged-post-header`}
        data-value={hashtagName}
      >
        {capitalize(hashtagName)}
        <hr
          style={{
            height: "4px",
            backgroundColor: hashtagColor?hashtagColor:"var(--text-primary)"
          }}
        />
      </h1>
      
    </header>
  );
};

const TaggedPostContainer = ({ children }) => {
  return (
    <MainLayout className={`px-4 mb-0`}>
      <div className="max-w-[42rem] mx-auto mb-6">{children}</div>
    </MainLayout>
  );
};

const TaggedPosts = () => {
  const { hashtagId, hashtagName } = useParams();

  const {
    data,
    isError,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetAllTaggedPosts({
    hashtagId,
  });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  useScrollToTop({ depArr: [hashtagName] });

  if (isError) {
    console.error("Error while loading tagged posts ==> ",error);
    return (
      <TaggedPostContainer>
        <TaggedPostsHeading />
        <ErrorText>Error while loading tagged posts !!</ErrorText>
      </TaggedPostContainer>
    );
  }
  if (isLoading) {
    return (
      <TaggedPostContainer>
        <TaggedPostsHeading />
        <PostArticleSkeleton count={4} className="max-w-[50rem] mx-auto mb-6" />
      </TaggedPostContainer>
    );
  }

  const posts = data.pages.map((item) => item.posts).flat();

  return (
    <TaggedPostContainer>
      <TaggedPostsHeading />
      
      {posts.length <= 0 ? (
        <NotFound>No post found !</NotFound>
      ) : (
        <ArticleSection posts={posts} ref={lastElement} />
      )}
    </TaggedPostContainer>
  );
};

export default TaggedPosts;
