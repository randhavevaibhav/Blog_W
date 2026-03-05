import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getUserProfilePageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { RiUserFollowFill } from "react-icons/ri";
import { getFormattedDateString } from "@/utils/utils";
import { useMobile } from "@/hooks/utils/useMobile";

const FollowedAt = ({ followedAt }) => {
  const formattedFollowedAtDateStr = getFormattedDateString({
    date: followedAt,
  });
  return (
    <div className="flex gap-2 items-center mb-2">
      <RiUserFollowFill size={"16px"} className="text-blue-400" />
      <span className="text-fs_xs text-text-fade">
        Followed At&nbsp;:&nbsp;&nbsp;
        <span data-test={"followed-at"}>{formattedFollowedAtDateStr}</span>
      </span>
    </div>
  );
};

export const Follower = forwardRef(
  ({ id, name, email, profileImgURL, isMutual, followedAt }, ref) => {
    const { preFetchUserInfo } = usePrefetch();
    const navigate = useNavigate();
    const isMobile = useMobile();

    return (
      <div
        className="cursor-pointer relative bg-card-bg rounded-md pb-4 pt-2 px-2"
        ref={ref}
        onMouseOver={() => {
          preFetchUserInfo({
            userId: id,
          });
        }}
        onClick={() =>
          navigate(
            getUserProfilePageLink({
              userId: id,
            }),
          )
        }
      >
        <FollowedAt followedAt={followedAt} />
        <div className="lg:flex lg:flex-col lg:gap-2 items-center grid grid-cols-[60px_auto] gap-4">
          <UserAvatar avatarSize={isMobile?"medium":"large"} userProfileImg={profileImgURL} />

          <div>
            <p className="capitalize text-fs_base font-semibold lg:text-center">
              {name}
            </p>
            <p className="text-fs_base font-semibold text-action-color underline lg:text-center">
              {email}
            </p>
          </div>
          {isMutual ? (
            <HiOutlineCheckBadge
              className={`text-orange-400 absolute right-2 top-1`}
              size={"24px"}
            />
          ) : null}
        </div>
      </div>
    );
  },
);
