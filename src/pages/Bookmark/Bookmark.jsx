import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllBookmarks } from "@/hooks/bookmark/useGetAllBookmarks";
import { LoadingTextWithGIF } from "@/components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import PostContainer from "@/components/common/PostContainer/PostContainer";
import { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article className="" ref={ref}>
        <PostContainer className={``}>
          <div className="flex items-start">
            <PostContainer.UserProfile profileImg={postData.title_img_url} />
            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={postData.auther_name} />
              <PostContainer.PostTitle
                userId={postData.auther_id}
                postId={postData.post_id}
              >
                <h4 className="text-fs_xl text-text-primary hover:text-[#7e76dd] font-extrabold capitalize">
                  {postData.title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostPublish createdAt={postData.created_at} />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});

export const Bookmark = () => {
  const { data, isPending, isError, error } = useGetAllBookmarks();

  if (isPending) {
    return <LoadingTextWithGIF>Loading bookmarks ...</LoadingTextWithGIF>;
  }

  if (isError) {
    if (error.status === 404) {
      return (
        <MainLayout>
          <span>No bookmarks !</span>
        </MainLayout>
      );
    } else {
      return (
        <MainLayout>
          <ErrorText>Error while loading bookmarks !</ErrorText>
        </MainLayout>
      );
    }
  }

  return (
    <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
      Bookmarks
      <div className="article_list flex flex-col gap-4 p-4 h-screen overflow-auto">
        {data.bookmarks.map((post) => {
          return <Article postData={post} key={uuidv4()} />;
        })}
      </div>
    </MainLayout>
  );
};
