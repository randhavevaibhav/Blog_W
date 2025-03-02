import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";

import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";
import { Reactions } from "../../components/Dashboard/PostContainer/Reactions/Reactions";

export const IndiviualPost = () => {
  const { postId } = useParams();

  const { isPending, data, isError } = useGetIndiviualPost({ postId });

  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
        {isPending ? <LoadingWithText>Loading post ...</LoadingWithText> : null}
        {isError ? <ErrorText>Error while loading post !</ErrorText> : null}
        {data ? console.log("postData ===> ", data) : null}
        {data ? (
          <div className="md:grid md:grid-cols-[4rem_9fr_3fr] h-screen gap-3">
            <aside>
              <Reactions
                className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
                iconsSize={`1.6rem`}
                likeCount={data.postData.likes ? data.postData.likes : 0}
                commentCount={0}
              />
            </aside>

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
