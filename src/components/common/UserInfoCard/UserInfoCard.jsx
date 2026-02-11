import { useAuth } from "@/hooks/auth/useAuth";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorText } from "../ErrorText/ErrorText";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { FollowButton } from "../FollowButton/FollowButton";
import { IoMail } from "react-icons/io5";
import { getFormattedDateString } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getUpdateUserPageLink, getUserProfilePageLink } from "@/utils/getLinks";

const UserInfoCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 p-1 pb-10">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <Skeleton className="h-10 w-[180px] rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-[245px]" />
          <Skeleton className="h-4 w-[245px]" />
          <Skeleton className="h-4 w-[245px]" />
        </div>
      </div>
    </>
  );
};

export const UserInfoCard = memo(({ userId, queryEnable = true }) => {
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const isCurrentUser = parseInt(userId) === parseInt(currentUserId);
  const navigate = useNavigate();

  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useGetUserInfo({ userId, currentUserId, queryEnable });

  if (isPending) {
    return (
      
      <UserInfoCardSkeleton />
    );
  }

  if (isError) {
    console.error(error);
    return <ErrorText>Error while fetching userInfo !</ErrorText>;
  }

  const userInfo = userData.userInfo;
  const {
    firstName,
    isFollowed,
    bio,
    location,
    email,
    registeredAt,
    profileImgURL,
  } = userInfo;

  const formattedDateStr = getFormattedDateString({
    date: registeredAt,
  });

  // console.log("userinfo card re-render")

  return (
    <Card className="bg-card-bg md:block hidden">
      <CardHeader
        className=" cursor-pointer p-4 pb-0 mb-4"
        onClick={(e) => {
          e.stopPropagation();
          navigate(getUserProfilePageLink({
            userId
          }));
        }}
        data-test={`user-info-card-header`}
      >
        <div className="flex gap-2 items-center mb-2">
          <UserAvatar userProfileImg={profileImgURL} />

          <h3 className="text-fs_xl text-gray-400 capitalize">{firstName}</h3>
        </div>
        <div>
          {isCurrentUser ? (
            <Link
              to={getUpdateUserPageLink()}
              className="bg-action-color  shadow hover:bg-[#6057ca]/90 md:px-4 px-4 py-5 md:h-9 h-8 font-medium inline-flex items-center justify-center rounded-md text-white w-full"
              onClick={(e) => {
                e.stopPropagation();
              }}
              data-test={"edit-user-btn"}
            >
              Edit User
            </Link>
          ) : (
            <FollowButton
              userId={userId}
              isFollowed={isFollowed}
              currentUserId={currentUserId}
              className={`w-full`}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4 pt-0">
        <div className="text-fs_small text-gray-400">
          <p className="capitalize text-primary font-semibold">JOINED</p>
          <p>{formattedDateStr}</p>
        </div>
        <hr />
        {bio ? (
          <div className="text-fs_small text-gray-400">
            <p className="capitalize text-primary font-semibold">Bio</p>
            <p>{bio}</p>
          </div>
        ) : null}
        {location ? (
          <div className="text-fs_small text-gray-400">
            <p className="capitalize text-primary font-semibold">LOCATION</p>
            <p>{location}</p>
          </div>
        ) : null}
        <div className="text-fs_small text-gray-400">
          <p className="capitalize text-primary font-semibold">MAIL</p>
          <a
            href="mailto:testusermail@gmail.com"
            className="flex gap-2 items-center text-gray-400"
          >
            <IoMail />
            {email}
          </a>
        </div>
      </CardContent>
    </Card>
  );
})