import { Post } from "./Post/Post";
import { useSearchParams } from "react-router-dom";
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
import toast from "react-hot-toast";
import { MAX_SELECTED_POST } from "@/utils/constants";
import { MultiPostSelect } from "./MultiPostSelectMenu/MultiPostSelect";
import { cn } from "@/lib/utils";

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

  const { archivePost, isPending: isArchivePostPending } = useArchivePost(isArchive);

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  const [selectedPosts, setSelectedPosts] = useState(() => {
    const saved = getLocalStorageItem("selectedPosts");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    setLocalStorageItem("selectedPosts", JSON.stringify([...selectedPosts]));
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
          deSelectAllPosts={()=>{}}
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

  const handleSelectAllPosts = () => {
    setLocalStorageItem("selectAllPosts", true);
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

  const handleDeSelectAllPosts = () => {
    setLocalStorageItem("selectAllPosts", false);
     setLocalStorageItem("selectedPosts", null);
    setSelectedPosts(new Set());
  };

  if (totalPosts <= 0) {
    return (
      <div className="text-fs_lg font-medium flex flex-col">
        <PostsHeader totalPostsCount={0} deSelectAllPosts={()=>{}}/>

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
             deSelectAllPosts={handleDeSelectAllPosts}
          />
          <div className="flex my-2 md:flex-row flex-col-reverse">
            <MultiPostSelect
              selectAllPosts={handleSelectAllPosts}
              deSelectAllPosts={handleDeSelectAllPosts}
              totalSelectedPosts={selectedPosts.size}
              archivePost={archivePost}
            />
            {totalPosts > 1 ? <SortPosts /> : null}
          </div>
        </div>

        <div className={cn({
          "archive_posts_container":isArchive,
          "all_posts_container":!isArchive
        },"flex flex-col gap-4")}>
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
