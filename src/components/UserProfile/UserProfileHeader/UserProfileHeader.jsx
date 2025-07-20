import React from "react";
import { useParams } from "react-router-dom";
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
}) => {
  const { userId } = useParams();
  const { auth } = useAuth();
  const { userId: currentUserId, accessToken } = auth;
  const isCurrentUser = parseInt(userId) === parseInt(currentUserId);

  return (
    <Card className=" mb-4 bg-bg-shade">
      <CardContent className="pt-2 md:p-6 p-4">
        {accessToken ? (
          isCurrentUser ? (
            <EditUserButton userId={currentUserId} />
          ) : (
            <div className="flex justify-end">
              <FollowButton
                currentUserId={currentUserId}
                userId={userId}
                isFollowed={isFollowed}
                className={`md:w-[8rem] w-[5rem]`}
              />
            </div>
          )
        ) : null}

        <UserProfileInfo
          userProfileImg={userProfileImg}
          userName={userName}
          userBio={userBio}
          userLocation={userLocation}
          joinedOn={joinedOn}
          userMail={userMail}
          userWebsiteURL={userWebsiteURL}
        />
      </CardContent>
    </Card>
  );
};
