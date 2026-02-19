import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { ArticleSection } from "@/components/TaggedPosts/ArticleSection/ArticleSection";
import { useGetAllTaggedPosts } from "@/hooks/posts/useGetAllTaggedPosts";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { useScrollToTop } from "@/hooks/utils/useScrollToTop";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotFound } from "@/components/common/NotFound/NotFound";
import { capitalize } from "lodash-es";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FilterHomePosts } from "@/components/Home/FilterHomePosts/FilterHomePosts";


const TaggedPostsHeading = () => {
  const { hashtagName,hashtagColor } = useParams();

  const navigate = useNavigate();
  return (
    <header>
    <div className="flex justify-between items-center">
        <Button
        variant={"ghost"}
        className={"my-2"}
        onClick={() => {
          navigate("/");
        }}
      >
        <ArrowLeft />
        Back
      </Button>
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
