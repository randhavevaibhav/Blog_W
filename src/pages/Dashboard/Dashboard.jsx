import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";
import { useGetAllOwnPosts } from "../../hooks/posts/useGetAllOwnPosts";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import { Button } from "@/components/ui/button";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { data, isPending, error, isError } = useGetAllOwnPosts();
  if (isPending) {
    return (
      <>
        <MainLayout className="p-4">
          <LoadingTextWithGIF>Loading posts ...</LoadingTextWithGIF>
        </MainLayout>
        <Footer />
      </>
    );
  }

  if (isError) {
    if (error.status === 404) {
      return (
        <>
          <MainLayout className="main_container p-2">
            <>
              <Header
                totoalPostsCount={0}
                totalCommentsCount={0}
                totalLikesCount={0}
              />
              {/*Side container */}
              <div className="sidebar md:block hidden">Sidebar</div>
              <div className="flex flex-col gap-2">
                <span>No posts yet.</span>
                <Link to={`/new`}>
                  <Button className={`cursor-pointer md:hidden`}>
                    <IoCreate className="text-fs_lg" />
                    Create post
                  </Button>
                </Link>
              </div>
            </>
          </MainLayout>
          <Footer />
        </>
      );
    }
    return (
      <>
        <MainLayout className="p-2">
          <ErrorText>Unkown Error ocuured while Fetching post data</ErrorText>
        </MainLayout>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainLayout className="main_container p-2">
        <>
          <Header
            totoalPostsCount={data.total_post_count}
            totalCommentsCount={data.total_post_comments}
            totalLikesCount={data.total_likes_count}
          />
          {/*Side container */}
          <div className="sidebar md:block hidden">Sidebar</div>
          {/* users all posts container */}

          <PostsContainer data={data.posts} />
        </>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Dashboard;
