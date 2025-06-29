import { MainLayout } from "@/components/common/MainLayout/MainLayout";

import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { useState } from "react";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

export const Bookmark = () => {
  const [sortBy, setSortBy] = useState("desc");

  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks({
    sortBy,
  });

  const handleSortByChange = ({ option }) => {
    setSortBy(option);
  };

  if (isFetching || isPending) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Loading Bookmarks...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  if (isError) {
    if (error.status === 404) {
      return (
        <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
          <PageNotFound>No Bookmarks found !</PageNotFound>
        </MainLayout>
      );
    } else {
      return (
        <MainLayout className={`max-w-[1024px] mb-0 p-10`}>
          <ErrorText>Error while loading bookmarks !</ErrorText>
        </MainLayout>
      );
    }
  }

  const bookmarks = data.bookmarks;
  const totalBookmarks = bookmarks.length;

  return (
    <>
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0 p-4`}>
        <div className="">
          <div>
            <SortBookmarks
              handleSortByChange={handleSortByChange}
              sortBy={sortBy}
            />
          </div>
          <BookmarkList bookmarks={bookmarks} totalBookmarks={totalBookmarks} />
        </div>
      </MainLayout>
    </>
  );
};
