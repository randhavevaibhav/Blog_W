import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import "./IndiviualPost.css";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";

import { ActionBar } from "../../components/IndiviualPost/ActionBar/ActionBar";
import { ShortUserInfo } from "../../components/IndiviualPost/ShortUserInfo/ShortUserInfo";

import { useReactToPrint } from "react-to-print";
import { useCallback, useRef } from "react";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import PageNotFound from "../PageNotFound/PageNotFound";
import { formatNumber } from "@/utils/utils";
import SEO from "@/components/common/SEO/SEO";
import { setLocalStorageItem } from "@/utils/browser";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

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
       <Error>
        Error while loading post !
       </Error>
      );
    }
  }

  if (isFetchIndviPostPending) {
    return (
     <Loading>
      Loading post...
     </Loading>
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
        <div className="md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 md:mt-20 mt-12 md:pt-0 pt-2">
          <ActionBar
            totalLikes={totalLikes}
            totalComments={totalComments}
            isLikedByUser={isLikedByUser}
            bookmarked={isBookmarked}
          />
          <div className="px-2 ">
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
        </div>
      </MainLayout>
    </>
  );
};

export default IndiviualPost;
