import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndividualPost } from "../../hooks/posts/useGetIndividualPost";
import "./IndividualPost.css";
import { CommentSection } from "../../components/IndividualPost/CommentSection/CommentSection";

import { ActionBar } from "../../components/IndividualPost/ActionBar/ActionBar";
import { ShortUserInfo } from "../../components/IndividualPost/ShortUserInfo/ShortUserInfo";

import { useReactToPrint } from "react-to-print";
import { useCallback, useEffect, useRef } from "react";
import { MainArticle } from "../../components/IndividualPost/MainArticle/MainArticle";

import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import PageNotFound from "../PageNotFound/PageNotFound";
import { formatNumber } from "@/utils/utils";
import SEO from "@/components/common/SEO/SEO";
import { setLocalStorageItem } from "@/utils/browser";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useLocation } from "react-router-dom";

const IndividualPost = () => {
  const {
    isPending: isFetchIndividualPostPending,
    data,
    isError,
    error,
  } = useGetIndividualPost();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
     
      if (commentSectionRef.current) {
        commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  const printContentRef = useRef(null);
  const commentSectionRef = useRef(null);
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
      return <Error>Error while loading post !</Error>;
    }
  }

  if (isFetchIndividualPostPending) {
    return <Loading>Loading post...</Loading>;
  }
  const postData = data.postData;

  const totalComments = formatNumber(Number(postData.totalComments));
  const totalLikes = formatNumber(Number(postData.totalLikes));

  const isLikedByUser = postData.postLikedByUser;
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
  // console.log("IndividualPost re-render !");
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
              ref={commentSectionRef}
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

export default IndividualPost;
