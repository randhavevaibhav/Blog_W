import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useGetUserInfo } from "../../hooks/user/useGetUserInfo";
import { UserProfileHeader } from "../../components/UserProfile/UserProfileHeader/UserProfileHeader";
import { LeftSidebar } from "../../components/UserProfile/LeftSidebar/LeftSidebar";
import { RecentPost } from "../../components/UserProfile/RecentPost/RecentPost";
import { RecentComment } from "../../components/UserProfile/RecentComment/RecentComment";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";
import UserProfileSkeleton from "@/components/UserProfileSkeleton/UserProfileSkeleton";

const UserProfile = () => {
  const { userId } = useParams();

  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useGetUserInfo({ userId });

  if (isPending) {
    return <UserProfileSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <Error>Error while fetching userInfo !</Error>;
  }

  const userName = userData.userInfo.firstName;
  const userMail = userData.userInfo.email;
  const joinedOn = userData.userInfo.registeredAt;
  const userBio = userData.userInfo.bio;
  const userSkills = userData.userInfo.skills;
  const userWebsiteURL = userData.userInfo.websiteURL;
  const userLocation = userData.userInfo.location;
  const userProfileImg = userData.userInfo.profileImgURL;
  const recentPost = userData.recentPost;
  const recentComment = userData.recentComment;
  const isFollowed = userData.userInfo.isFollowed;
  const totalFollowers = userData.userInfo.totalUserFollowers;
  const totalFollowings = userData.userInfo.totalUserFollowings;
  const totalComments = userData.userInfo.totalOwnPostsComments;
  const totalPosts = userData.userInfo.totalUserPosts;
  const isMutual = userData.userInfo.isMutual;
  const userEmailName = userMail?.split("@")[0] + `@`;
  return (
    <MainLayout className={` mb-0 md:p-1 p-2`}>
      {/* user info Header */}

      <div className="max-w-[1024px] md:mx-auto mx-2 pt-2 pb-2">
        <UserProfileHeader
          userId={userId}
          userEmailName={userEmailName}
          userMail={userMail}
          userName={userName}
          joinedOn={joinedOn}
          userProfileImg={userProfileImg}
          userBio={userBio}
          userLocation={userLocation}
          userWebsiteURL={userWebsiteURL}
          isFollowed={isFollowed}
          isMutual={isMutual}
        />

        {/* user data Bottom */}
        <div className="bottom_info_div grid md:grid-cols-[1fr_2fr] gap-4 ">
          {/* Left side */}
          <LeftSidebar
            userId={userId}
            skills={userSkills}
            totalPosts={totalPosts}
            totalComments={totalComments}
            totalFollowers={totalFollowers}
            totalFollowings={totalFollowings}
          />
          {/* main content */}
          <div className="main_content">
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
