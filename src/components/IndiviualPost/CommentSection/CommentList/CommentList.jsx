import React from "react";

import { useGetAllPostComments } from "@/hooks/comments/useGetAllPostComments";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Button } from "@/components/ui/button";
import { Comments } from "./Comments/Comments";

export const CommentList = ({ sortCmtBy = "desc" }) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useGetAllPostComments({ sortBy: sortCmtBy });

  // console.log("CommentList re-render");

  // console.log("comments in comments compo ==> ",comments)
  if (isLoading) {
    return (
      <LoadingTextWithSpinner>Loading comments ...</LoadingTextWithSpinner>
    );
  }
  if (isError) {
    return <ErrorText>Error while loading comments!</ErrorText>;
  }
  const handleFetchMoreCmt = () => {
    if (hasNextPage && !isFetching && !isLastComment) {
      fetchNextPage();
    }
  };
  const commentsData = data.pages.map((item) => item.comments).flat();
  const isLastComment =
    data.pages[data.pages.length - 1].comments.length >=5  ? false : true;
  return (
    <>
      <div className="flex flex-col gap-4">
        <Comments commentsData={commentsData}/>

        {isFetching ? (
          <LoadingTextWithSpinner>Fetching comments ...</LoadingTextWithSpinner>
        ) : null}
        {!isLastComment ? (
          <Button onClick={handleFetchMoreCmt}>load more ...</Button>
        ) : null}
      </div>
    </>
  );
};
