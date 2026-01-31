import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import "./Dashboard.css";
import { UserStat } from "../../components/Dashboard/UserStat/UserStat";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";
import { useState } from "react";
import { PostsHeader } from "@/components/Dashboard/PostsHeader/PostsHeader";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Sidebar } from "@/components/Dashboard/Sidebar/Sidebar";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import { useAuth } from "@/hooks/auth/useAuth";
const Dashboard = () => {
  const { auth } = useAuth();
  const { userId } = auth;
  const { data, isPending, isError, error } = useGetUserInfo({
    userId,
  });
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
        <Error>Error occurred while Fetching post data !</Error>
        <Footer />
      </>
    );
  }

  const handleSortByChange = ({ option }) => {
    setSortBy(option);
  };

  const totalPostsCount = data.userInfo.totalUserPosts;
  const totalCommentsCount = data.userInfo.totalUserComments;
  const totalLikesCount = data.userInfo.totalOwnPostsLikes;
  const totalFollowers = data.userInfo.totalUserFollowers;
  const totalFollowings = data.userInfo.totalUserFollowings;

  return (
    <>
      <MainLayout className="main_container p-2 overflow-auto ">
        <>
          <UserStat
            totalPostsCount={totalPostsCount}
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
              totalPostsCount={totalPostsCount}
              sortBy={sortBy}
            />
            <PostsContainer totalPostsCount={totalPostsCount} sortBy={sortBy} />
          </div>
        </>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Dashboard;
