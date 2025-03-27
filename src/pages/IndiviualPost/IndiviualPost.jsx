import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";
import { useGetAllPostComments } from "../../hooks/comments/useGetAllPostComments";
import { CommentSection } from "../../components/IndiviualPost/CommentSection/CommentSection";
import { MarkDown } from "../../components/common/MarkDown/MarkDown";
import { Link } from "react-router-dom";
import { LeftSidebar } from "../../components/IndiviualPost/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";
import { format } from "date-fns";

export const IndiviualPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
  } = useGetIndiviualPost();
  const { isPending: isFetchCommentsPending, data: commentsData } =
    useGetAllPostComments();

  const isFetchFullPostPending =
    isFetchIndviPostPending || isFetchCommentsPending;

  if (isError) {
    return (
      <MainLayout>
        <ErrorText>Error while loading post !</ErrorText>
      </MainLayout>
    );
  }

  if (isFetchFullPostPending) {
    return <LoadingWithText>Loading post ...</LoadingWithText>;
  }

  const postData = data.postData;
  const isLikedByUser = data.likedByUser;

  // console.log("IndiviualPost re-render !! ===>")

  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
      
        <main className="md:px-2 px-6 md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3">
          <LeftSidebar
            commentsCount={commentsData.total_comments_count}
            likesCount={postData.totalLikes}
            likedByUser={isLikedByUser}
          />
          <article>
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
            </header>
            <div className="article_main">
              <MarkDown>{postData.content}</MarkDown>
            </div>
            <CommentSection data={commentsData} />
          </article>
          <RightSidebar />
        </main>
      </MainLayout>
    </>
  );
};
