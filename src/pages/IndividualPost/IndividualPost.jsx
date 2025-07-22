import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndividualPost } from "../../hooks/posts/useGetIndividualPost";
import "./IndividualPost.css";
import { CommentSection } from "../../components/IndividualPost/CommentSection/CommentSection";

import { ActionBar } from "../../components/IndividualPost/ActionBar/ActionBar";

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
import { useLocation, useParams } from "react-router-dom";

import { UserInfoCard } from "@/components/common/UserInfoCard/UserInfoCard";
import { useGetPostAnalytics } from "@/hooks/posts/useGetPostAnalytics";

const IndividualPost = () => {
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
  const { userId, postId } = useParams();

  const {
    isPending: isIndividualPostPending,
    data,
    isError: isIndPostFetchError,
    error: indPostFetchError,
  } = useGetIndividualPost({ userId, postId });

  const {
    data: postAnalyticsData,
    isPending: isPostAnalyticsPending,
    isError: isPostAnalyticsError,
  } = useGetPostAnalytics({
    userId,
    postId,
  });

  const reactToPrintFn = useCallback(
    useReactToPrint({
      contentRef: printContentRef,
    }),
    []
  );

  const isPending = isIndividualPostPending || isPostAnalyticsPending;
  const isError = isIndPostFetchError || isPostAnalyticsError;

  if (isError) {
    if (isIndPostFetchError) {
      if (indPostFetchError.status === 404) {
        return <PageNotFound>No post found !</PageNotFound>;
      }
    } else {
      return <Error>Error while loading post !</Error>;
    }
  }

  if (isPending) {
    return <Loading>Loading post...</Loading>;
  }
  const postData = data.postData;
  const postAnalytics = postAnalyticsData.postAnalytics;

  // post analytics data
  const totalComments = formatNumber(Number(postAnalytics.totalComments));
  const totalLikes = formatNumber(Number(postAnalytics.totalLikes));
  const isLikedByUser = postAnalytics.postLikedByUser;
  const isBookmarked = postAnalytics.postBookmarked;
  const isFollowed = postAnalytics.isFollowed;

  // Post data
  const postTitle = postData.title;
  const postContent = postData.content;
  const postTitleImgURL = postData.titleImgURL;
  const userName = postData.userName;
  const userProfileImg = postData.userProfileImg;
  const createdAt = postData.createdAt;
  const tagList = postData.tagList;

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
        <div className="md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 md:mt-20 mt-12 md:pt-0 pt-4 px-2 py-2">
          <ActionBar
            totalLikes={totalLikes}
            totalComments={totalComments}
            isLikedByUser={isLikedByUser}
            bookmarked={isBookmarked}
          />
          <div className="">
            <MainArticle
              ref={printContentRef}
              reactToPrintFn={reactToPrintFn}
              postContent={postContent}
              postTitle={postTitle}
              postTitleImgURL={postTitleImgURL}
              userName={userName}
              createdAt={createdAt}
              userProfileImg={userProfileImg}
              tagList={tagList}
            />
            <CommentSection
              totalComments={totalComments}
              ref={commentSectionRef}
            />
          </div>
          <aside>
            <UserInfoCard userId={userId} />
          </aside>

          <ScrollToTop />
        </div>
      </MainLayout>
    </>
  );
};

export default IndividualPost;
