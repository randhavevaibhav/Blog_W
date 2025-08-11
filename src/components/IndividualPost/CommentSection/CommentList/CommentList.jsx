import React, { useEffect, useState } from "react";

import { useGetAllPostComments } from "@/hooks/comments/useGetAllPostComments";

import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Button } from "@/components/ui/button";
import { Comments } from "./Comments/Comments";
import { memo } from "react";
import { CommentListSkeleton } from "./CommentListSkeleton/CommentListSkeleton";

export const CommentList = memo(({ sortCmtBy = "desc", handleSortTrigger }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetAllPostComments({ sortBy: sortCmtBy });
  const [fetchBySort, setFetchBySort] = useState(false);

  if (isLoading || (isFetching && fetchBySort)) {
    return <CommentListSkeleton count={6} />;
  }

  if (isError) {
    return <ErrorText>Error while loading comments!</ErrorText>;
  }
  const handleFetchMoreCmt = () => {
    setFetchBySort(false);
    if (hasNextPage && !isFetching && !isLastComment) {
      fetchNextPage();
    }
  };
  const commentsData = data.pages.map((item) => item.comments).flat();
  const isLastComment =
    data.pages[data.pages.length - 1].comments.length >= 5 ? false : true;

  return (
    <>
      <div className="flex flex-col gap-4" data-test={`comments-list`}>
        <Comments commentsData={commentsData} level={1} />

        {isFetching ? <CommentListSkeleton count={6} /> : null}
        {!isLastComment && !isFetching ? (
          <Button onClick={handleFetchMoreCmt}>Load more comments...</Button>
        ) : null}
      </div>
    </>
  );
});
