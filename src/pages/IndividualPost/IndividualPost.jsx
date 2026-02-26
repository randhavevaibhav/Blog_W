import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetIndividualPost } from "@/hooks/posts/useGetIndividualPost";
import "./IndividualPost.css";
import { CommentSection } from "./components/CommentSection/CommentSection";
import { ActionBar } from "./components/ActionBar/ActionBar";
import { useReactToPrint } from "react-to-print";
import { useCallback, useEffect, useRef } from "react";
import { MainArticle } from "./components/MainArticle/MainArticle";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import PageNotFound from "../PageNotFound/PageNotFound";
import { formatNumber } from "@/utils/utils";
import SEO from "@/components/common/SEO/SEO";
import { setLocalStorageItem } from "@/utils/browser";
import Error from "../Error/Error";
import { useLocation, useParams } from "react-router-dom";
import { UserInfoCard } from "@/components/common/UserInfoCard/UserInfoCard";
import { IndividualPostSkeleton } from "./components/IndividualPostSkeleton";

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
  const { postId } = useParams();

  const {
    isPending: isIndividualPostPending,
    data,
    isError: isIndPostFetchError,
    error: indPostFetchError,
  } = useGetIndividualPost({ postId });

  const reactToPrintFn = useCallback(
    useReactToPrint({
      contentRef: printContentRef,
    }),
    [],
  );

  const isPending = isIndividualPostPending;
  const isError = isIndPostFetchError;

  if (isError) {
    if (isIndPostFetchError) {
      if (indPostFetchError.status === 404) {
        return (
          <PageNotFound dataTestId={`post-not-found`}>
            No post found !
          </PageNotFound>
        );
      }
    } else {
      return <Error>Error while loading post !</Error>;
    }
  }

  if (isPending) {
    return <IndividualPostSkeleton />;
  }
  const postData = data.postData;

  // post analytics data
  const totalComments = formatNumber(Number(postData.totalComments));
  const totalLikes = formatNumber(Number(postData.likes));
  const isLikedByUser = postData.isLikedByUser;
  const isBookmarked = postData.isBookmarked;

  // Post data
  const userId = postData.userId;
  const postTitle = postData.title;
  const postContent = postData.content;
  const postTitleImgURL = postData.titleImgURL;
  const userName = postData.firstName;
  const userProfileImg = postData.profileImgURL;
  const createdAt = postData.createdAt;
  const tagList = postData.hashtags;
  const archive = postData.archive;
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
        <div
          className="md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 md:mt-20 mt-12 md:pt-0 pt-4 px-2 py-2"
          data-test={`individual-post-container`}
        >
          <ActionBar
            userId={userId}
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
              userId={userId}
              archive={archive}
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
