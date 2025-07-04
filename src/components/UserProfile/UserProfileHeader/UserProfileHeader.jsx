import { format } from "date-fns";
import React from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { UserAvatar } from "../../common/UserAvatar/UserAvatar";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardContent } from "../../ui/card";
import { useCreateFollower } from "@/hooks/follower/useCreateFollower";
import { useRemoveFollower } from "@/hooks/follower/useRemoveFollower";
import { EditUserButton } from "./EditUserButton/EditUserButton";
import { FollowButton } from "./FollowButton/FollowButton";
import { UserProfileInfo } from "./UserProfileInfo/UserProfileInfo";
export const UserProfileHeader = ({
  userEmailName,
  userName,
  userMail,
  joinedOn,
  userBio,
  userLocation,
  userWebsiteURL,
  userProfileImg,
  isFollowed,
  isUserInfoRefetching,
}) => {
  const { userId } = useParams();
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const isCurrentUser = parseInt(userId) === parseInt(currentUserId);

  const { createFollower, isPending: isCreateFollowerPending } =
    useCreateFollower({
      currentUserId,
      followingUserId: userId,
    });

  const { removeFollower, isPending: isRemoveFollowerPending } =
    useRemoveFollower({
      currentUserId,
      followingUserId: userId,
    });

  const followerPending =
    isCreateFollowerPending || isRemoveFollowerPending || isUserInfoRefetching;

  const handleUserFollow = () => {
    if (isFollowed) {
      removeFollower();
    } else {
      createFollower();
    }
  };
  return (
    <Card className=" mb-4 bg-bg-shade">
      <CardContent className="pt-2 md:p-6 p-4">
        {isCurrentUser ? (
          <EditUserButton userId={currentUserId} />
        ) : (
          <FollowButton
            isFollowed={isFollowed}
            handleUserFollow={handleUserFollow}
            followerPending={followerPending}
          />
        )}
  
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
