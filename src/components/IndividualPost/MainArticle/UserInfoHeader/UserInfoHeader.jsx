import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getFormattedDateString } from "@/utils/utils";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UserInfoHeader = ({
  userId,
  userProfileImg,
  userName,
  createdAt,
}) => {
  const { preFetchUserInfo } = usePrefetch();
  const navigate = useNavigate();
  const formattedDateStr = getFormattedDateString({ createdAt });
  return (
    <div
      className="flex items-center gap-2 my-2  px-2 py-2 rounded-md max-w-fit cursor-pointer"
      onClick={() => {
        navigate(`/userprofile/${userId}`);
      }}
      onMouseOver={() => preFetchUserInfo({ userId })}
    >
      <UserAvatar userProfileImg={userProfileImg} />

      <div className="flex flex-col">
        <span className="text-xl font-bold mr-2 capitalize">{userName}</span>
        <span className="md:text-fs_small text-fs_xs text-gray-400">
          Published:&nbsp;{formattedDateStr}
        </span>
      </div>
    </div>
  );
};
