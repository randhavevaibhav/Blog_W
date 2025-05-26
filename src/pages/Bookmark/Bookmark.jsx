import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import { LoadingTextWithGIF } from "@/components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

import { v4 as uuidv4 } from "uuid";
import { Article } from "@/components/Bookmark/Article";
import { NoDataFoundGIF } from "@/components/common/NoDataFoundGIF/NoDataFoundGIF";

export const Bookmark = () => {
  const { data, isPending, isError, error } = useGetAllBookmarks();

  if (isPending) {
    return <LoadingTextWithGIF>Loading bookmarks ...</LoadingTextWithGIF>;
  }

  if (isError) {
    if (error.status === 404) {
      return (
        <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
          <div className="flex flex-col gap-2 min-h-[inherit] justify-center items-center">
            <NoDataFoundGIF>No bookmarks found !!</NoDataFoundGIF>
          </div>
        </MainLayout>
      );
    } else {
      return (
        <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
          <ErrorText>Error while loading bookmarks !</ErrorText>
        </MainLayout>
      );
    }
  }

  return (
    <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
      <div className="article_list flex flex-col gap-4 p-4 h-screen overflow-auto">
        {data.bookmarks.map((post) => {
          return <Article postData={post} key={uuidv4()} />;
        })}
      </div>
    </MainLayout>
  );
};
