import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { UserStat } from "../../components/Dashboard/UserStat/UserStat";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";

import { useGetUserStat } from "@/hooks/user/useGetUserStat";
import { useState } from "react";

import { PostsHeader } from "@/components/Dashboard/PostsHeader/PostsHeader";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Sidebar } from "@/components/Dashboard/Sidebar/Sidebar";
const Dashboard = () => {
  const { data, isPending, isError, error } = useGetUserStat();
  const [sortBy, setSortBy] = useState("desc");

  if (isPending) {
    return (
      <>
        <Loading>Loading posts ...</Loading>
        <Footer />
      </>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <>
        <Error>Error ocuured while Fetching post data !</Error>
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
  const totalFollowers = data.totalFollowers;
  const totalFollowings = data.totalFollowings;
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
          <Sidebar
            totalFollowers={totalFollowers}
            totalFollowings={totalFollowings}
          />
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
