import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { UserStat } from "../../components/Dashboard/UserStat/UserStat";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";

import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useGetUserStat } from "@/hooks/user/useGetUserStat";
import { useState } from "react";

import { PostsHeader } from "@/components/Dashboard/PostsHeader/PostsHeader";
const Dashboard = () => {
  const { data, isPending, isError } = useGetUserStat();
  const [sortBy, setSortBy] = useState("desc");

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

  const handleSortByChange = ({ option }) => {
    setSortBy(option);
  };

  const totoalPostsCount = data.totalPosts;
  const totalCommentsCount = data.totalComments;
  const totalLikesCount = data.totalLikes;
  return (
    <>
      <MainLayout className="main_container p-2 overflow-auto ">
        <>
          <UserStat
            totoalPostsCount={totoalPostsCount}
            totalCommentsCount={totalCommentsCount}
            totalLikesCount={totalLikesCount}
          />
          {/*Side container */}
          <div className="sidebar md:block hidden">Sidebar</div>
          {/* users all posts container */}

          <div>
            <PostsHeader
              handleSortByChange={handleSortByChange}
              totoalPostsCount={totoalPostsCount}
              sortBy={sortBy}
            />
            <PostsContainer
              totoalPostsCount={totoalPostsCount}
              sortBy={sortBy}
            />
          </div>
        </>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Dashboard;
