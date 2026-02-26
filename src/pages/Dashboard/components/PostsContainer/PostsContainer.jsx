import { Post } from "./Post/Post";
import { useSearchParams } from "react-router-dom";
import { useGetAllUserPosts } from "@/hooks/posts/useGetAllUserPosts";
import { v4 as uuidv4 } from "uuid";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuid } from "uuid";
import { memo } from "react";
import { PostsHeader } from "../PostsHeader/PostsHeader";

const DashBoardPostsSkeleton = ({ count = 6 }) => {
  return (
    <div
      className="flex flex-col space-y-3  max-w-[1106px] mt-4"
      data-test={`articles-skeleton`}
    >
      {Array(count)
        .fill(0)
        .map(() => {
          return (
            <Skeleton
              className="w-full h-[114px] bg-skeleton-bg"
              key={uuid()}
            />
          );
        })}
    </div>
  );
};

export const PostsContainer = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const archive = searchParams.get("archive") ? searchParams.get("archive") : 0;
  const isArchive = parseInt(archive) === 1;
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetAllUserPosts({ sortBy: sort, archive });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  const dashBoardPostLoading = (isLoading || isFetching) && !isFetchingNextPage;

  if (dashBoardPostLoading) {
    return (
      <div>
        <PostsHeader totalPostsCount={0} />

        <DashBoardPostsSkeleton />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <>
        <div className="mt-10">
          <p className="text-red-500 text-lg">error == {error.toString()} </p>
          <ErrorText> Error occurred while Fetching posts</ErrorText>
        </div>
      </>
    );
  }
  const postData = data.pages.map((item) => item.posts).flat();
  const archivePosts = data.pages.map((item) => item.archivePosts).flat()[0];
  const unarchivePosts = data.pages
    .map((item) => item.unarchivePosts)
    .flat()[0];
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length > 1 ? postData.length - 2 : 0;
  const totalPosts = isArchive ? archivePosts : unarchivePosts;

  return (
    <>
      <div>
        {totalPosts > 0 ? (
          <>
            <PostsHeader totalPostsCount={totalPosts} />

            <div className="posts_container flex flex-col gap-4">
              {postData.map((post, i) => {
                return (
                  <Post
                    postData={post}
                    key={uuidv4()}
                    ref={thirdLastElementIndex === i + 1 ? lastElement : null}
                  />
                );
              })}
            </div>
            {isFetchingNextPage ? <DashBoardPostsSkeleton count={3} /> : null}
          </>
        ) : (
          <div className="text-fs_lg font-medium flex flex-col">
            <PostsHeader totalPostsCount={totalPosts} />

            <p>No posts found !</p>
          </div>
        )}
      </div>
    </>
  );
});
