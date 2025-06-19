import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";

import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useGetUserStat } from "@/hooks/user/useGetUserStat";
const Dashboard = () => {
  const { data, isPending, isError } = useGetUserStat();

  if (isPending) {
    return (
      <>
        <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
          <LoadingTextWithSpinner direction="center">
            Loading posts ...
          </LoadingTextWithSpinner>
        </MainLayout>

        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <MainLayout className="p-2">
          <ErrorText> Error ocuured while Fetching post data</ErrorText>
        </MainLayout>
        <Footer />
      </>
    );
  }

  // console.log("data in dashborad ===>", data);

  const totoalPostsCount = data.totalPosts;
  const totalCommentsCount = data.totalComments;
  const totalLikesCount = data.totalLikes;
  return (
    <>
      <MainLayout className="main_container p-2 overflow-auto">
        <>
          <Header
            totoalPostsCount={totoalPostsCount}
            totalCommentsCount={totalCommentsCount}
            totalLikesCount={totalLikesCount}
          />
          {/*Side container */}
          <div className="sidebar md:block hidden">Sidebar</div>
          {/* users all posts container */}

          <PostsContainer totoalPostsCount={totoalPostsCount} />
        </>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Dashboard;
