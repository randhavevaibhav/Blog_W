import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { getFormattedDateString } from "@/utils/utils";
import React, { memo } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { FaArrowUpRightFromSquare, FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

export const UserProfileInfo = memo(({
  userProfileImg,
  userName,
  userBio,
  userLocation,
  joinedOn,
  userMail,
  userWebsiteURL,
}) => {
    const formattedDateStr = getFormattedDateString({ createdAt:joinedOn });
  return (
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
          {`Joined on ${formattedDateStr}`}
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
  );
})