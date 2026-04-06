import { Post } from "./Post/Post";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllUserPosts } from "@/hooks/posts/useGetAllUserPosts";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuid } from "uuid";
import { memo, useCallback, useEffect, useState } from "react";
import { PostsHeader } from "../PostsHeader/PostsHeader";
import { useArchivePost } from "@/hooks/posts/useArchivePost";
import { SortPosts } from "../SortPosts/SortPosts";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { MAX_SELECTED_POST } from "@/utils/constants";
import { getDeleteNPostsPageLink } from "@/utils/getLinks";

export const DashBoardPostsSkeleton = ({ count = 6 }) => {
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
  const [searchParams, _] = useSearchParams();
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

  const navigate = useNavigate();

  const { archivePost, isPending: isArchivePostPending } = useArchivePost();

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  const [selectedPosts, setSelectedPosts] = useState(() => {
    const saved = getLocalStorageItem("selectedItems");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    setLocalStorageItem("selectedItems", JSON.stringify([...selectedPosts]));
  }, [selectedPosts]);

  const handleSelectPost = useCallback((id) => {
    setSelectedPosts((prev) => {
      const next = new Set(prev);
      if (next.size > MAX_SELECTED_POST) {
        toast.error(`Please select less posts max:${MAX_SELECTED_POST}`);
        return next;
      }
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const dashBoardPostLoading =
    (isLoading || isFetching || isArchivePostPending) && !isFetchingNextPage;

  if (dashBoardPostLoading) {
    return (
      <div>
        <PostsHeader
          totalPostsCount={0}
          dashBoardPostLoading={dashBoardPostLoading}
        />
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
  const postData = data.pages.flatMap((page) => page.posts);

  const totalArchivePosts = data.pages
    .map((item) => item.archivePostsCount)
    .flat()[0];
  const totalUnarchivePosts = data.pages
    .map((item) => item.unarchivePostsCount)
    .flat()[0];
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length > 1 ? postData.length - 2 : 0;
  const totalPosts = isArchive ? totalArchivePosts : totalUnarchivePosts;
  const hasSelectedPosts = selectedPosts.size >= 1;

  const handleSelectAllPosts = () => {
    const postIds = postData.map((post) => post.postId);
    setSelectedPosts((prev) => {
      const next = new Set([...prev, ...postIds]);
      if (next.size > MAX_SELECTED_POST) {
        toast.error(`Selection exceeds limit of ${MAX_SELECTED_POST}`);
        return prev;
      }
      return next;
    });
  };

  if (totalPosts <= 0) {
    return (
      <div className="text-fs_lg font-medium flex flex-col">
        <PostsHeader totalPostsCount={0} />

        <p>No posts found !</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="lg:px-2 px-1">
          <PostsHeader
            totalPostsCount={totalPosts}
            dashBoardPostLoading={dashBoardPostLoading}
          />
          <div className="w-fit ml-auto my-2">
            {totalPosts > 1 ? <SortPosts /> : null}
          </div>
          <div className="flex gap-4 my-2">
            {hasSelectedPosts ? (
              <Button
                className={"font-semibold tracking-wider"}
                onClick={() => {
                  setSelectedPosts(new Set());
                }}
              >
                Deselect All
              </Button>
            ) : null}
            <Button
              className={"font-semibold tracking-wider"}
              onClick={handleSelectAllPosts}
              variant={"action"}
            >
              Select All
            </Button>

            {hasSelectedPosts && selectedPosts.size > 1 ? (
              <Button
                className={
                  "font-semibold bg-red-500 text-white hover:bg-red-500 tracking-wider"
                }
                onClick={() => {
                  navigate(getDeleteNPostsPageLink());
                }}
              >
                {`Delete selected ${selectedPosts.size}`}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="posts_container flex flex-col gap-4">
          {postData.map((post, i) => {
            const isSelected = selectedPosts.has(post.postId);
            return (
              <Post
                postData={post}
                key={`post_${post.postId}`}
                ref={thirdLastElementIndex === i + 1 ? lastElement : null}
                archivePost={archivePost}
                onSelectPost={handleSelectPost}
                isSelected={isSelected}
              />
            );
          })}
        </div>
        {isFetchingNextPage ? <DashBoardPostsSkeleton count={3} /> : null}
      </div>
    </>
  );
});
