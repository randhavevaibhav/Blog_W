import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import Error from "../Error/Error";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";
import { BookmarksHeader } from "@/components/Bookmark/BookmarkList/BookmarksHeader/BookmarksHeader";
import { useSearchParams } from "react-router-dom";
import { TagList } from "@/components/Bookmark/TagList/TagList";
import { TagSelect } from "@/components/Bookmark/TagList/TagSelect/TagSelect";

const Bookmark = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtagId")
    ? searchParams.get("hashtagId")
    : 0;
  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks({
    sortBy,
    hashtagId,
  });

  const handleSortByChange = ({ option }) => {
    setSearchParams({
      sort: option,
      hashtagId,
    });
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
  const allPostHashtags = data?.allPostHashtags;

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="grid md:grid-cols-[20rem_auto] grid-col-1">
          <div>
            <BookmarksHeader totalBookmarks={totalBookmarks} />
            <TagList hashtags={allPostHashtags} />
          </div>
          <div>
            <div className="flex justify-between">
              <TagSelect hashtags={allPostHashtags} />
              <SortBookmarks
                handleSortByChange={handleSortByChange}
                sortBy={sortBy}
              />
            </div>

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
