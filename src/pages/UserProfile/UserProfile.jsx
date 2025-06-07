import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useGetUserInfo } from "../../hooks/user/useGetUserInfo";
import { Header } from "../../components/UserProfile/Header";
import { LeftSidebar } from "../../components/UserProfile/LeftSidebar";
import { RecentPost } from "../../components/UserProfile/RecentPost";
import { RecentComment } from "../../components/UserProfile/RecentComment";
import { useParams } from "react-router-dom";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";

const UserProfile = () => {
  const { userId } = useParams();
  const { data: userData, isPending, isError } = useGetUserInfo({ userId });
  if (isPending) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Loading user info...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout className={`max-w-[1024px]`}>
        <ErrorText>Error while feching userInfo</ErrorText>
      </MainLayout>
    );
  }

  const userName = userData.userInfo.first_name;
  const userMail = userData.userInfo.email;
  const joinedOn = userData.userInfo.registered_at;
  const userBio = userData.userInfo.bio;
  const userWebsiteURL = userData.userInfo.website_url;
  const userLocation = userData.userInfo.location;
  const userProfileImg = userData.userInfo.profile_img_url;
  const totalComments = userData.totalComments;
  const totalPosts = userData.totalPosts;
  const recentPost = userData.recentPost;
  const recentComment = userData.recentComment;

  const userEmailName = userMail?.split("@")[0] + `@`;
  return (
    <MainLayout className={`max-w-[1024px] mb-0 px-2`}>
      {/* user info Header */}

      <div className="md:mx-auto mx-2 ">
        <Header
          userEmailName={userEmailName}
          userMail={userMail}
          userName={userName}
          joinedOn={joinedOn}
          userProfileImg={userProfileImg}
          userBio={userBio}
          userLocation={userLocation}
          userWebsiteURL={userWebsiteURL}
        />

        {/* user data Bottom */}
        <div className="bottom_info_div grid md:grid-cols-[1fr_2fr] gap-4 ">
          {/* Left side */}
          <LeftSidebar totalPosts={totalPosts} totalComments={totalComments} />
          {/* main content */}
          <div className="main_content flex flex-col gap-4">
            <RecentPost recentPost={recentPost} />
            {/* recent comments */}
            <RecentComment recentComment={recentComment} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default UserProfile;
