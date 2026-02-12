import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import Error from "../Error/Error";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { BookmarksHeader } from "@/components/Bookmark/BookmarkList/BookmarksHeader/BookmarksHeader";
import { BookmarkFilter } from "@/components/Bookmark/BookmarkFilter/BookmarkFilter";
import { useSearchParams } from "react-router-dom";



const Bookmark = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtag")
    ? searchParams.get("hashtag")
    : 0;

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
            <BookmarkFilter allPostHashtags={[]} />
            <SortBookmarks />
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
  const totalBookmarks = bookmarks?.length ? bookmarks.length : 0;
  const normalizedPostHashtags = data?.allPostHashtags;

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex justify-between lg:flex-row flex-col gap-4">
          <BookmarksHeader totalBookmarks={totalBookmarks} />
          <div className="flex gap-2  justify-between">
            <BookmarkFilter allPostHashtags={normalizedPostHashtags} />
            <SortBookmarks />
          </div>
        </div>
        <BookmarkList bookmarks={bookmarks} totalBookmarks={totalBookmarks} />
      </MainLayout>
    </>
  );
};

export default Bookmark;
