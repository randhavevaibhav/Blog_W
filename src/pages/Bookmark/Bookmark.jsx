import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

import { v4 as uuidv4 } from "uuid";
import { Article } from "@/components/Bookmark/Article";

import PageNotFound from "../PageNotFound/PageNotFound";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";

export const Bookmark = () => {
  const { data, isPending, isError, error, isFetching } = useGetAllBookmarks();

  if (isPending || isFetching) {
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
      return <PageNotFound>No Bookmarks found !</PageNotFound>;
    } else {
      return (
        <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
          <ErrorText>Error while loading bookmarks !</ErrorText>
        </MainLayout>
      );
    }
  }

  return (
    <>
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0 p-4`}>
        <div className=" flex flex-col article_list gap-4 overflow-auto mx-auto max-w-[50rem]">
          <h2 className="text-fs_3xl capitalize font-semibold ">
            Bookmarks&nbsp;
            <span className="text-fs_2xl">
              (&nbsp;{`${data.bookmarks.length}`}&nbsp;)
            </span>
          </h2>
          {data.bookmarks.map((post) => {
            return <Article postData={post} key={uuidv4()} />;
          })}
        </div>
      </MainLayout>
    </>
  );
};
