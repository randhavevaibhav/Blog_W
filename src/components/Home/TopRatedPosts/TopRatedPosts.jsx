import { Card } from "@/components/ui/card";
import { Article } from "./Article";
import { useGetTopRatedPosts } from "@/hooks/posts/useGetTopRatedPosts";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { FaHeart } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";

const PostsContainer = ({ posts = [],dataTest }) => {
  return (
    <ul className="flex flex-col gap-4" data-test={dataTest}>
      {posts.map((post, idx) => {
        return (
          <li key={`${post.postId}_${idx}`}>
            <Card className="bg-card-bg">
              <Article postData={post} />
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

const TopLikedPostsHeader = () => {
  return (
    <header
      className={`flex items-center gap-4 font-semibold text-fs_xl py-1 px-3 pb-0 text-center tracking-wide`}
    >
      <FaHeart className="text-red-500 size-6" /> Top Liked Posts
    </header>
  );
};

const TopDiscussedPostsHeader = () => {
  return (
    <header
      className={`flex items-center gap-4 font-semibold text-fs_xl py-1 px-3 pb-0 text-center tracking-wide`}
    >
      <FaComments className="text-blue-400 size-6" />
      Top Discussed Posts
    </header>
  );
};

export const TopRatedPosts = () => {
  const { data, isError, error, isPending } = useGetTopRatedPosts();

  if (isError) {
    console.error(error);
    return (
      <ErrorText className={"mt-6"}>
        Error while fetching top rated posts !
      </ErrorText>
    );
  }
  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <TopLikedPostsHeader />
        <PostArticleSkeleton count={2} />
        <TopDiscussedPostsHeader />
        <PostArticleSkeleton count={2} />
      </div>
    );
  }

  const topLikedPosts = data.topLikedPosts;
  const topCommentedPosts = data.topCommentedPosts;
  return (
    <>
      <div className="flex flex-col gap-4">
        <TopLikedPostsHeader />
        {topLikedPosts.length <= 0 ? (
          <p>No posts found !</p>
        ) : (
          <PostsContainer posts={topLikedPosts} dataTest={"top-liked-articles-container"} />
        )}
        <TopDiscussedPostsHeader />
        {topCommentedPosts.length <= 0 ? (
          <p>No posts found !</p>
        ) : (
          <PostsContainer posts={topCommentedPosts} dataTest={"top-discussed-articles-container"}/>
        )}
      </div>
    </>
  );
};
