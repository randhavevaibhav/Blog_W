import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";

import { ActionBar } from "../../components/IndiviualPost/ActionBar/ActionBar";
import { ShortUserInfo } from "../../components/IndiviualPost/ShortUserInfo/ShortUserInfo";

import { useReactToPrint } from "react-to-print";
import { useCallback, useRef } from "react";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import PageNotFound from "../PageNotFound/PageNotFound";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { formatNumber } from "@/utils/utils";
import SEO from "@/components/common/SEO/SEO";
import { setLocalStorageItem } from "@/utils/browser";

const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
    error,
  } = useGetIndiviualPost();
  const printContentRef = useRef(null);
  const reactToPrintFn = useCallback(
    useReactToPrint({
      contentRef: printContentRef,
    }),
    []
  );

  if (isError) {
    if (error.status === 404) {
      return <PageNotFound>No post found !</PageNotFound>;
    } else {
      return (
        <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
          <ErrorText>Error while loading post !</ErrorText>
        </MainLayout>
      );
    }
  }

  if (isFetchIndviPostPending) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Loading post...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }
  const postData = data.postData;

  const totalComments = formatNumber(Number(postData.totalComments));
  const totalLikes = formatNumber(Number(postData.totalLikes));



  const isLikedByUser = postData.postlikedByUser;
  const isBookmarked = postData.postBookmarked;
  const postTitle = postData.title;
  const postContent = postData.content;
  const postTitleImgURL = postData.titleImgURL;
  const userName = postData.userName;
  const userProfileImg = postData.userProfileImg;
  const userEmail = postData.userEmail;
  const userJoinedOn = postData.userJoinedOn;
  const userLocation = postData.userLocation;
  const createdAt = postData.createdAt;
  // console.log("IndiviualPost re-render !");
 setLocalStorageItem("sortCmt", "desc");
 

  return (
    <>
      <SEO
        title={postTitle}
        type={"article"}
        description={`Blog posted on Blog-W about ${postTitle}`}
        name={"Blog-W article"}
        imagePath={postTitleImgURL}
        url={window.location.href}
      />
      <MainLayout className={``}>
        <main className="px-2 md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 md:mt-20 mt-12">
          <ActionBar
            totalLikes={totalLikes}
            totalComments={totalComments}
            isLikedByUser={isLikedByUser}
            bookmarked={isBookmarked}
          />
          <div>
            <MainArticle
              ref={printContentRef}
              reactToPrintFn={reactToPrintFn}
              postContent={postContent}
              postTitle={postTitle}
              postTitleImgURL={postTitleImgURL}
              userName={userName}
              createdAt={createdAt}
              userProfileImg={userProfileImg}
            />
            <CommentSection
             
              totalComments={totalComments}
            />
          </div>

          <ShortUserInfo
            
            userName={userName}
            userProfileImg={userProfileImg}
            userEmail={userEmail}
            userLocation={userLocation}
            userJoinedOn={userJoinedOn}
          />

          <ScrollToTop />
        </main>
      </MainLayout>
    </>
  );
};

export default IndiviualPost;
