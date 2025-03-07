import { useParams } from "react-router-dom";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetIndiviualPost } from "../../hooks/posts/useGetIndiviualPost";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import "./IndiviualPost.css";

import { RightSidebar } from "../../components/IndiviualPost/RightSidebar/RightSidebar";
import { MainArticle } from "../../components/IndiviualPost/MainArticle/MainArticle";
import { Reactions } from "../../components/Dashboard/PostContainer/Reactions/Reactions";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/auth/useAuth";
import { useGetAllPostComments } from "../../hooks/comments/useGetAllPostComments";


export const IndiviualPost = () => {
  const { isPending, data, isError, isSuccess } = useGetIndiviualPost();
  
 
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const userId = auth.userId;
  const { postId } = useParams();
  if (isSuccess) {
    queryClient.invalidateQueries({
      queryKey: ["getAllPostComments", userId, postId],
    });
  }

  if (isError) {
    return <ErrorText>Error while loading post !</ErrorText>;
  }

  return (
    <>
      <MainLayout className={`md:mx-10 max-w-full`}>
        {isPending ? <LoadingWithText>Loading post ...</LoadingWithText> : null}
        {/* {data ? console.log("postData ===> ", data) : null} */}
        {data ? (
          <div className="md:grid md:grid-cols-[4rem_9fr_3fr] h-screen gap-3">
            <aside>
              <Reactions
                className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
                iconsSize={`1.6rem`}
                likeCount={data.postData.likes ? data.postData.likes : 0}
              
              />
            </aside>

            <MainArticle
              userName={data.postData.userName}
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
