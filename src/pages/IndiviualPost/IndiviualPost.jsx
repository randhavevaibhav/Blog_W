import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/ErrorText/ErrorText";
import "./IndiviualPost.css";

import { LeftSidebar } from "../../components/IndiviualPost/LeftSidebar/LeftSidebar";
import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";

export const IndiviualPost = () => {
  const { postId } = useParams();

  const { isPending, data, isError } = useGetIndiviualPost({ postId });

  return (
    <>
      <MainLayout className={`mx-10 max-w-full`}>
        {isPending ? <LoadingWithText>Loading post ...</LoadingWithText> : null}
        {isError ? <ErrorText>Error while loading post !</ErrorText> : null}
        {data ? console.log("postData ===> ",data) : null}
        {data ? (
          <div className="grid md:grid-cols-[4rem_9fr_3fr] grid-cols-[4rem_1fr] h-screen gap-3">
            <LeftSidebar likes={data.postData.likes} />

            <MainArticle
              imgURL={data.postData.title_img_url}
              content={data.postData.content}
              postTitle={data.postData.title}
              createdAt={data.postData.created_at}
            />
            <RightSidebar />
          </div>
        ) : null}
      </MainLayout>
    </>
  );
};
