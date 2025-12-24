import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { useState } from "react";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import Error from "../Error/Error";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { BookmarksHeader } from "@/components/Bookmark/BookmarkList/BookmarksHeader/BookmarksHeader";

const Bookmark = () => {
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
    if (!(error.status === 404)) {
      console.error(error);
      return <Error>Error while loading bookmarks !</Error>;
    }
  }

  const bookmarks = data?.bookmarks ? data.bookmarks : [];
  const totalBookmarks = bookmarks?.length ? bookmarks.length : 0;

  console.log("totalBookmarks ==>", totalBookmarks);

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="grid md:grid-cols-[20rem_auto] grid-col-1">
          <BookmarksHeader totalBookmarks={totalBookmarks} />

          <div>
            <SortBookmarks
              handleSortByChange={handleSortByChange}
              sortBy={sortBy}
            />

            <BookmarkList
              bookmarks={bookmarks}
              totalBookmarks={totalBookmarks}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Bookmark;
