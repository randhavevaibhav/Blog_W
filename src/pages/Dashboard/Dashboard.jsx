import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostContainer } from "../../components/Dashboard/PostContainer/PostContainer";
import { useGetAllOwnPosts } from "../../hooks/posts/useGetAllOwnPosts";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";

import { Toaster } from "react-hot-toast";
import { useGetAllOwnPostComments } from "../../hooks/comments/useGetAllOwnPostComments";

export const Dashboard = () => {
  const { data, isPending, error, isError } = useGetAllOwnPosts();
  const{data:ownCommentsData,isPending:isFetchOwncommentsPending} = useGetAllOwnPostComments();

  return (
    <>
      <MainLayout className="main_container p-2">
        {/* {data ? console.log("data in dashborad ===> ", data.data) : null} */}

        <>
          <Header totoalPostsCount={data ? data.total_post_count : 0} totalCommentsCount={ownCommentsData?ownCommentsData.commentsCount:0}/>
          {/*Side container */}
          <div className="sidebar md:block hidden">Sidebar</div>
          {/* users all posts container */}
          {isPending && <LoadingWithText>Loading posts ...</LoadingWithText>}
          {isError && error.response.data.message && (
            <p>{error.response.data.message} </p>
          )}
          {data ? <PostContainer data={data.posts} /> : null}
        </>

        <Toaster />
      </MainLayout>
      <Footer />
    </>
  );
};
