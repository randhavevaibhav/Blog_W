import { Post } from "./Post/Post";

import _ from "lodash";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { useGetAllOwnPosts } from "@/hooks/posts/useGetAllOwnPosts";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";

import { ErrorText } from "@/components/common/ErrorText/ErrorText";

export const PostsContainer = ({ totoalPostsCount, sortBy }) => {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetAllOwnPosts({ sortBy });

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

  if (isLoading) {
    return (
      <>
        <LoadingTextWithSpinner direction="center">
          Loading posts ...
        </LoadingTextWithSpinner>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="mt-10">
          <ErrorText> Error ocuured while Fetching posts</ErrorText>
        </div>
      </>
    );
  }
  const postData = data.pages.map((item) => JSON.parse(item.posts)).flat();
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length > 1 ? postData.length - 2 : 0;
  return (
    <>
      <div>
        {parseInt(totoalPostsCount) > 0 ? (
          <>
            <div className="posts_container flex flex-col gap-4">
              {postData.map((post, i) => {
                return (
                  <Post
                    postData={post}
                    key={post.postId}
                    totalComments={post.totalComments}
                    likes={post.likes}
                    imgURL={post.imgURL}
                    ref={thirdLastElementIndex === i + 1 ? lastElement : null}
                  />
                );
              })}
            </div>
            {isFetching ? (
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
