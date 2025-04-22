import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useGetUserInfo } from "../../hooks/user/useGetUserInfo";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { Header } from "../../components/UserProfile/Header";
import { LeftSidebar } from "../../components/UserProfile/LeftSidebar";
import { RecentPost } from "../../components/UserProfile/RecentPost";
import { RecentComment } from "../../components/UserProfile/RecentComment";

const UserProfile = () => {
  const { data: userData, isPending, isError } = useGetUserInfo();

  if (isPending) {
    return (
      <MainLayout className={`max-w-[1024px]`}>
        <LoadingTextWithGIF>Loading user info...</LoadingTextWithGIF>
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
  const userProfileImg = userData.userInfo.profile_img_url;
  const totalComments = userData.totalComments;
  const totalPosts = userData.totalPosts;
  const recentPost = userData.recentPost;
  const recentComment = userData.recentComment;

  const userEmailName = userMail?.split("@")[0] + `@`;
  return (
    <MainLayout className={`max-w-[1024px]`}>
      {/* user info Header */}
     
        <Header
          userEmailName={userEmailName}
          userMail={userMail}
          userName={userName}
          joinedOn={joinedOn}
          userProfileImg={userProfileImg}
        />
    
      {/* user data Bottom */}
      <div className="bottom_info_div px-4 grid md:grid-cols-[1fr_2fr] gap-4">
        {/* Left side */}
        <LeftSidebar totalPosts={totalPosts} totalComments={totalComments}/>
        {/* main content */}
        <div className="main_content ">
         <RecentPost recentPost={recentPost}/>
          {/* recent comments */}
         <RecentComment recentComment={recentComment}/>
        </div>
      </div>
    </MainLayout>
  );
};
export default UserProfile;
