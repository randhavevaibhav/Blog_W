import React, { useState } from "react";
import { useGetAllPostComments } from "@/hooks/comments/useGetAllPostComments";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Button } from "@/components/ui/button";
import { Comments } from "./Comments/Comments";
import { memo } from "react";
import { CommentListSkeleton } from "./CommentListSkeleton/CommentListSkeleton";
import { useSearchParams } from "react-router-dom";

export const CommentList = memo(({ totalComments }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    error,
  } = useGetAllPostComments({ sortBy });
  const [fetchBySort, setFetchBySort] = useState(false);

  if (isLoading || (isFetching && fetchBySort)) {
    return <CommentListSkeleton count={6} />;
  }

  if (isError) {
    console.log("error in fetching comments ===> ", error);
    return <ErrorText>Error while loading comments!</ErrorText>;
  }
  if (totalComments <= 0) {
    return <p className="text-fs_base">No comments yet.</p>;
  }
  const handleFetchMoreCmt = () => {
    setFetchBySort(false);
    if (hasNextPage && !isFetching && !isLastComment) {
      fetchNextPage();
    }
  };

  // get normalize comment object
  const commentsData = data.pages.map((item) => item.comments).flat();
  const commentsIds = data.pages.map((item) => item.commentsIds).flat();
  const mergedComments = Object.assign({}, ...commentsData);
  const totalFetchedComments = Object.keys(
    commentsData[commentsData.length - 1],
  ).length;
  const isLastComment = totalFetchedComments < 5 ? true : false;

  return (
    <>
      <div className="flex flex-col gap-4" data-test={`comments-list`}>
        <Comments commentsData={mergedComments} commentsIds={commentsIds} />

        {isFetching ? <CommentListSkeleton count={6} /> : null}
        {!isLastComment && !isFetching ? (
          <Button onClick={handleFetchMoreCmt}>Load more comments...</Button>
        ) : null}
      </div>
    </>
  );
});
