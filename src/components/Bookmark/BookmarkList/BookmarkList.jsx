import React from "react";
import { Article } from "./Article/Article";
import { v4 as uuidv4 } from "uuid";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { BookmarksHeader } from "./BookmarksHeader/BookmarksHeader";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";

export const BookmarkList = ({ sortBy, handleShowSortMenu }) => {
  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks({
    sortBy,
  });

  if (isPending || isFetching) {
   
    return (
     
      <LoadingTextWithSpinner>
        Loading Bookmarks...
      </LoadingTextWithSpinner>
    );
  }

  if (isError) {
    handleShowSortMenu({showSortMenu:false});
    if (error.status === 404) {
      return <PageNotFound>No Bookmarks found !</PageNotFound>;
    } else {
      return <ErrorText>Error while loading bookmarks !</ErrorText>;
    }
  }

  const bookmarks = data.bookmarks;
  const totalBookmarks = bookmarks.length;

  if (totalBookmarks <= 1) {
     handleShowSortMenu({showSortMenu:false});
  }



  return (
    <>
     
      <div className="flex flex-col article_list gap-4 overflow-auto mx-auto max-w-[50rem]">
         <BookmarksHeader totalBookmarks={totalBookmarks} />
        {bookmarks.map((post) => {
          return <Article postData={post} key={uuidv4()} />;
        })}
      </div>
    </>
  );
};
