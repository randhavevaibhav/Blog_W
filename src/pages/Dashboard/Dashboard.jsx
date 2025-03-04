import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostContainer } from "../../components/Dashboard/PostContainer/PostContainer";
import { useGetAllOwnPosts } from "../../hooks/posts/useGetAllOwnPosts";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import { Toaster } from "react-hot-toast";

export const Dashboard = () => {
  const { data, isPending, error, isError } = useGetAllOwnPosts();

  return (
    <>
      <MainLayout className="main_container p-2">
        {isPending && <LoadingWithText>Loading posts ...</LoadingWithText>}
        {isError && error.response.data.message && (
          <ErrorText>{error.response.data.message} </ErrorText>
        )}
        {/* {data ? console.log("data in dashborad ===> ", data.data) : null} */}
        {data ? (
          <>
            <Header totoalPostsCount={data.total_post_count} />
            {/*Side container */}
            <div className="sidebar md:block hidden">Sidebar</div>
            {/* users all posts container */}
            <PostContainer data={data.posts} />
          </>
        ) : null}
        <Toaster />
      </MainLayout>
      <Footer />
    </>
  );
};
