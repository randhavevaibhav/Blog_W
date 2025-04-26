import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";

import { LeftSidebar } from "../../components/IndiviualPost/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";

import { useReactToPrint } from "react-to-print";
import { useCallback, useEffect, useRef, useState } from "react";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";
import { Button } from "@/components/ui/button";
import { FaChevronUp } from "react-icons/fa";

const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
  } = useGetIndiviualPost();
  const printContentRef = useRef(null);
  const reactToPrintFn = useCallback(
    useReactToPrint({
      contentRef: printContentRef,
    }),
    []
  );

  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsScrollTopVisible(true);
    } else {
      setIsScrollTopVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

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
  const userProfileImg = postData.userProfileImg;
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
              commentsData={commentsData}
              totalComments={totalComments}
            />
          </div>

          <RightSidebar />
          {isScrollTopVisible ? (
          
            <Button className={`fixed bottom-[20px] right-[20px] bg-bg-shade text-white border-none rounded-full cursor-pointer hover:text-black w-[45px] h-[45px] flex justify-center`} onClick={scrollToTop}><FaChevronUp/></Button>
          ) : null}
        </main>
      </MainLayout>
    </>
  );
};

export default IndiviualPost;
