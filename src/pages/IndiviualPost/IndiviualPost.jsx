import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";
import { MarkDown } from "../../components/common/MarkDown/MarkDown";
import { Link } from "react-router-dom";
import { LeftSidebar } from "../../components/IndiviualPost/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { Button } from "../../components/common/Button/Button";

export const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
  } = useGetIndiviualPost();
  const printContentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({
    contentRef: printContentRef,
  });

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

  console.log("IndiviualPost re-render ===> ");
  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
        <main className="px-2 md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 ">
          <LeftSidebar />
          <div>
            <article ref={printContentRef} id="main_article" className="px-2">
              <header>
                {postData.title_img_url ? (
                  <img
                    src={postData.title_img_url}
                    alt="article image"
                    className="w-[800px] h-[400px] object-contain"
                  />
                ) : null}

                <div className="article_heading my-3">
                  <h1 className="md:text-6xl text-4xl font-bold mb-2">
                    {postData.title}
                  </h1>
                  <Link to={`#`} className="text-2xl font-bold">
                    {postData.userName}
                  </Link>
                  <span className="text-sm text-gray-400 ml-5">
                    Published:{" "}
                    {format(new Date(postData.created_at), "yyyy-MM-dd")}
                  </span>
                </div>
                <Button
                  onClick={() => reactToPrintFn()}
                  className={`font-semibold text-sm px-2`}
                >
                  Print Article
                </Button>
              </header>
              <div className="article_main">
                <MarkDown>{postData.content}</MarkDown>
              </div>
            </article>
            <CommentSection />
          </div>

          <RightSidebar />
        </main>
      </MainLayout>
    </>
  );
};
