import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { useState } from "react";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import PageNotFound from "../PageNotFound/PageNotFound";
import Error from "../Error/Error";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";

export const Bookmark = () => {
  const [sortBy, setSortBy] = useState("desc");

  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks({
    sortBy,
  });

  const handleSortByChange = ({ option }) => {
    setSortBy(option);
  };

  if (isPending || isFetching) {
    return (
      <MainLayout
        className={` md:mx-auto !max-w-[700px] mb-0 p-4 bg-bg-primary`}
      >
        <PostArticleSkeleton count={4} />
      </MainLayout>
    );
  }

  if (isError) {
    console.error(error);
    if (error.status === 404) {
      return <PageNotFound>No Bookmarks found !</PageNotFound>;
    } else {
      return <Error>Error while loading bookmarks !</Error>;
    }
  }

  const bookmarks = data.bookmarks;
  const totalBookmarks = bookmarks.length;

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
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
