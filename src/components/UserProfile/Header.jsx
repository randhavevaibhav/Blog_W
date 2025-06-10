import { format } from "date-fns";
import React from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useAuth } from "@/hooks/auth/useAuth";
import { Card, CardContent, CardHeader } from "../ui/card";
export const Header = ({
  userEmailName,
  userName,
  userMail,
  joinedOn,
  userBio,
  userLocation,
  userWebsiteURL,
  userProfileImg,
}) => {
  const { userId } = useParams();
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const isCurrentUser = Number(userId) === Number(currentUserId);
  return (
    <Card className="mb-4">
      <CardContent className="pt-2">
        {isCurrentUser ? (
          <div className="flex justify-end ">
            <Link
              to={`/userprofile/edit/${userId}`}
              className="bg-action-color  shadow hover:bg-[#6057ca]/90 px-4 py-2 md:h-9 h-8 font-medium inline-flex items-center justify-center rounded-md text-white"
            >
              Edit User
            </Link>
          </div>
        ) : null}
        <header className="rounded-md">
          <div className="text-center user_details flex flex-col gap-2 mb-4 items-center">
            <UserAvatar userProfileImg={userProfileImg} avatarSize="large" />

            <h2 className="text-fs_3xl">{userName}</h2>
            {userBio ? (
              <p className="text-fs_base max-w-[32rem]">{userBio}</p>
            ) : null}
          </div>

          <div className="meta text-sm flex md:gap-6 gap-2 md:justify-center flex-col items-center md:items-start md:flex-row">
            {userLocation ? (
              <span className="flex gap-2 items-center text-gray-400 text-fs_small">
                <FaLocationDot />
                {userLocation}
              </span>
            ) : null}
            <span className="flex gap-2 items-center text-gray-400 text-fs_small">
              <FaBirthdayCake />
              {`Joined on ${format(new Date(joinedOn), "yyyy-MM-dd")}`}
            </span>
            <a
              href="mailto:testusermail@gmail.com"
              className="flex gap-2 items-center text-gray-400"
            >
              <IoMail />
              {userMail}
            </a>
            {userWebsiteURL ? (
              <Link
                to={userWebsiteURL}
                target="_blank"
                className="flex gap-2 items-center text-gray-400"
              >
                <FaArrowUpRightFromSquare />
                {userWebsiteURL}
              </Link>
            ) : null}
          </div>
        </header>
      </CardContent>
    </Card>
  );
};
