import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import Error from "../Error/Error";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { BookmarksHeader } from "@/components/Bookmark/BookmarkList/BookmarksHeader/BookmarksHeader";
import { BookmarkFilter } from "@/components/Bookmark/BookmarkFilter/BookmarkFilter";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NotFound } from "@/components/common/NotFound/NotFound";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Bookmark = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtag")
    ? searchParams.get("hashtag")
    : 0;
  const [bookmarkQuery, setBookmarkQuery] = useState("");

  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks({
    sortBy,
    hashtagId,
  });

  const isBookmarksLoading = isPending || isFetching;

  if (isBookmarksLoading) {
    return (
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex justify-between lg:flex-row flex-col gap-4">
          <BookmarksHeader totalBookmarks={0} />
          <div className="flex gap-2  justify-between">
            <BookmarkFilter />
            <SortBookmarks disable={true}/>
          </div>
        </div>
        <div className="mx-auto max-w-[42rem]">
          <PostArticleSkeleton count={4} />
        </div>
      </MainLayout>
    );
  }

  if (isError) {
    const Not404 = !(error.status === 404);
    if (Not404) {
      console.error("Error while loading bookmarks ! ==> ", error);

      return (
        <MainLayout
          className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
        >
          <BookmarksHeader totalBookmarks={0} />
          <div>
            <Error>Error while loading bookmarks !</Error>
          </div>
        </MainLayout>
      );
    }
  }

  const bookmarks = data?.bookmarks ? data.bookmarks : [];

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    if (bookmarkQuery.length <= 0) {
      return true;
    } else {
      return bookmark.title.toLowerCase().includes(bookmarkQuery.toLowerCase());
    }
  });

  const totalBookmarks = filteredBookmarks?.length
    ? filteredBookmarks.length
    : 0;

  const resetFilter =()=>{
    setBookmarkQuery("");
    setSearchParams({
       hashtag: 0,
      sort:"desc",
    })
  }

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex  lg:flex-row flex-col lg:gap-8 gap-4 lg:mb-2 ">
          <BookmarksHeader totalBookmarks={totalBookmarks} />
          <div className="relative w-full">
            <FaSearch
              className="absolute left-0 top-2 ml-2 cursor-pointer"
              size={"22px"}
            />
            <Input
              placeholder="Search bookmarks"
              className="border-card-border pl-10 w-full"
              onChange={(e) => {
                setBookmarkQuery(e.target.value);
              }}
              value={bookmarkQuery}
            />
          </div>
          <div className="flex gap-2  justify-between">
            <BookmarkFilter />
            <SortBookmarks />
          </div>
        </div>
        {totalBookmarks > 0 ? (
          <BookmarkList
            bookmarks={filteredBookmarks}
            totalBookmarks={totalBookmarks}
          />
        ) : (
          <NotFound>
            <p>No bookmarks found with this filter 😕!</p>
            <Button onClick={resetFilter} className={"text-base"} >Rest filters</Button>


          </NotFound>
        )}
      </MainLayout>
    </>
  );
};

export default Bookmark;
