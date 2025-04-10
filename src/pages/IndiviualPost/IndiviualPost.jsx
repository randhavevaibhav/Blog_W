import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";

import { LeftSidebar } from "../../components/IndiviualPost/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";

import { useReactToPrint } from "react-to-print";
import { useCallback, useRef } from "react";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
  } = useGetIndiviualPost();
  const printContentRef = useRef(null);
  const reactToPrintFn =useCallback( useReactToPrint({
    contentRef: printContentRef,
  }),[])

  if (isError) {
    return (
      <MainLayout>
        <ErrorText>Error while loading post !</ErrorText>
      </MainLayout>
    );
  }

  if (isFetchIndviPostPending) {
    return <LoadingTextWithGIF>Loading post ...</LoadingTextWithGIF>;
  }

  const postData = data.postData;

  const commentsData = postData.comments;

  const totalComments = Number(postData.totalComments);

  const totalLikes = Number(postData.totalLikes);
  const isLikedByUser = postData.likedByUser;

  const postTitle = postData.title;
  const postContent = postData.content;
  const postTitleImgURL = postData.title_img_url;
  const userName = postData.userName;
  const createdAt = postData.created_at;
  // console.log("IndiviualPost re-render !")
  return (
    <>
      <MainLayout className={``}>
        <main className="px-2 md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 ">
          <LeftSidebar
            totalLikes={totalLikes}
            totalComments={totalComments}
            isLikedByUser={isLikedByUser}
          />
          <div>
            <MainArticle ref={printContentRef}
            reactToPrintFn={reactToPrintFn}
            postContent={postContent}
            postTitle={postTitle}
            postTitleImgURL={postTitleImgURL}
            userName={userName}
            createdAt={createdAt}
            />
            <CommentSection
              commentsData={commentsData}
              totalComments={totalComments}
            />
          </div>

          <RightSidebar />
        </main>
      </MainLayout>
    </>
  );
};

export default IndiviualPost;
