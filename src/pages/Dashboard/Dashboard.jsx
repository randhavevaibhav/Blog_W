import { Footer } from "@/components/common/Footer/Footer";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import "./Dashboard.css";
import { UserStat } from "./components/UserStat/UserStat";
import { PostsContainer } from "./components/PostsContainer/PostsContainer";
import { PostsHeader } from "./components/PostsHeader/PostsHeader";
import Error from "../Error/Error";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import { useAuth } from "@/hooks/auth/useAuth";
import { SortPosts } from "./components/PostsHeader/SortPosts/SortPosts";
import { PostArticleSkeleton } from "@/components/common/PostArticleSkeleton/PostArticleSkeleton";

const DashboardContainer = ({ children }) => {
  return (
    <>
      <MainLayout className="main_container p-2 overflow-auto ">
        {children}
      </MainLayout>

      <Footer />
    </>
  );
};

const Dashboard = () => {
  const { auth } = useAuth();
  const { userId } = auth;
  const { data, isPending, isError, error } = useGetUserInfo({
    userId,
  });

  if (isPending) {
    return (
      <DashboardContainer>
        <UserStat
          totalPostsCount={0}
          totalCommentsCount={0}
          totalLikesCount={0}
        />

        <Sidebar totalFollowers={0} totalFollowings={0} />

        <div className="">
          <div className="flex justify-between md:mb-3 my-3">
            <PostsHeader totalPostsCount={0} />
            <SortPosts disable={true} />
          </div>
          <PostArticleSkeleton count={4} />
        </div>
      </DashboardContainer>
    );
  }

  if (isError) {
    console.error("Error occurred while Fetching post data ! ==>", error);
    return (
      <DashboardContainer>
        <UserStat
          totalPostsCount={0}
          totalCommentsCount={0}
          totalLikesCount={0}
        />

        <Sidebar totalFollowers={0} totalFollowings={0} />

        <div>
          <Error>Error occurred while Fetching post data !</Error>
        </div>
      </DashboardContainer>
    );
  }

  const totalPostsCount = data.userInfo.totalUserPosts;
  const totalCommentsCount = data.userInfo.totalOwnPostsComments;
  const totalLikesCount = data.userInfo.totalOwnPostsLikes;
  const totalFollowers = data.userInfo.totalUserFollowers;
  const totalFollowings = data.userInfo.totalUserFollowings;

  return (
    <DashboardContainer>
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

      <PostsContainer />
    </DashboardContainer>
  );
};

export default Dashboard;
