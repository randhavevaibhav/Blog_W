import { Post } from "./Post/Post";

import _ from "lodash";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { useGetAllUserPosts } from "@/hooks/posts/useGetAllUserPosts";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { v4 as uuidv4 } from "uuid";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";

export const PostsContainer = ({ totalPostsCount, sortBy }) => {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetAllUserPosts({ sortBy });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  if ((isLoading || isFetching) && !isFetchingNextPage) {
    return (
      <>
        <div className="flex flex-col space-y-3  max-w-[1106px]">
          <PostArticleSkeleton count={4} className="mt-0" />
        </div>
      </>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <>
        <div className="mt-10">
          <ErrorText> Error occurred while Fetching posts</ErrorText>
        </div>
      </>
    );
  }
  const postData = data.pages.map((item) => item.posts).flat();
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length > 1 ? postData.length - 2 : 0;

  return (
    <>
      <div>
        {parseInt(totalPostsCount) > 0 ? (
          <>
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
            {isFetchingNextPage ? (
              <LoadingTextWithSpinner>
                Fetching posts ....
              </LoadingTextWithSpinner>
            ) : null}
          </>
        ) : (
          <div className="text-fs_lg font-medium flex justify-between items-center">
            <p>No posts found !</p>
            <Link to={`/new`}>
              <Button className={`cursor-pointer md:hidden`} variant="action">
                <IoCreate className="text-fs_lg" />
                Create post
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
