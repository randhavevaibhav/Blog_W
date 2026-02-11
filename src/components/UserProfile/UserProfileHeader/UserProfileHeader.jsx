import React from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardContent } from "../../ui/card";
import { EditUserButton } from "./EditUserButton/EditUserButton";
import { UserProfileInfo } from "./UserProfileInfo/UserProfileInfo";
import { FollowButton } from "@/components/common/FollowButton/FollowButton";


export const UserProfileHeader = ({
  userName,
  userMail,
  joinedOn,
  userBio,
  userLocation,
  userWebsiteURL,
  userProfileImg,
  isFollowed,
  userId,
  isMutual,
}) => {
  const { auth } = useAuth();
  const { userId: currentUserId, accessToken } = auth;
  const isCurrentUser =
    parseInt(userId) === parseInt(currentUserId) && accessToken;

  return (
    <Card className=" mb-4 bg-bg-shade">
      <CardContent className="pt-2 md:p-6 p-4">
        {!isCurrentUser ? (
          <div className="flex justify-end items-center">
            <FollowButton
              currentUserId={currentUserId}
              userId={userId}
              isFollowed={isFollowed}
              className={`md:w-[8rem] w-[5rem]`}
            />
          </div>
        ) : (
          <EditUserButton />
        )}

        <UserProfileInfo
          userProfileImg={userProfileImg}
          userName={userName}
          userBio={userBio}
          userLocation={userLocation}
          joinedOn={joinedOn}
          userMail={userMail}
          userWebsiteURL={userWebsiteURL}
          isMutual={isMutual}
        />
      </CardContent>
    </Card>
  );
};
