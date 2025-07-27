import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { ArticleSection } from "@/components/TaggedPosts/ArticleSection/ArticleSection";
import { useGetAllTaggedPosts } from "@/hooks/posts/useGetAllTaggedPosts";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { useScrollToTop } from "@/hooks/utils/useScrollToTop";
import React from "react";
import { useParams } from "react-router-dom";

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
    hashtagName,
  });
  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  useScrollToTop({ depArr: [hashtagName] });

  if (isError) {
    return <ErrorText>Error while loading tagged posts !!</ErrorText>;
  }
  if (isLoading) {
    return (
      <MainLayout
        className={` md:mx-auto max-w-[700px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex flex-col space-y-3">
          <PostArticleSkeleton count={4} />
        </div>
      </MainLayout>
    );
  }

  const posts = data.pages.map((item) => item.posts).flat();

  return (
    <MainLayout className={` px-4 mb-0 `}>
      <div className="max-w-[50rem] mx-auto mb-6">
        <h1 className="text-fs_3xl font-extrabold md:py-10 py-8">{`Posts tagged with "${hashtagName}"`}</h1>
        <ArticleSection posts={posts} ref={lastElement} />
      </div>
    </MainLayout>
  );
};

export default TaggedPosts;
