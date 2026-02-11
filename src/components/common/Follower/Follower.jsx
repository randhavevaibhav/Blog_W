import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getUserProfilePageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { RiUserFollowFill } from "react-icons/ri";
import { getFormattedDateString } from "@/utils/utils";



const FollowedAt = ({ followedAt }) => {
  const formattedFollowedAtDateStr = getFormattedDateString({
    date: followedAt,
  });
  return (
    <div className="flex gap-2 items-center mb-1">
      <RiUserFollowFill size={"16px"} className="text-blue-400"/>
      <span className="text-fs_xs text-text-fade">
        Followed At&nbsp;:&nbsp;&nbsp;{formattedFollowedAtDateStr}
      </span>
    </div>
  );
};

export const Follower = forwardRef(
  ({ id, name, email, profileImgURL,isMutual,followedAt }, ref) => {
    const { preFetchUserInfo } = usePrefetch();
    const navigate = useNavigate();
   
    return (
      <div
        className="cursor-pointer relative bg-card-bg rounded-md pb-4 pt-2 px-2"
        ref={ref}
        onMouseOver={() => {
          preFetchUserInfo({
            userId: id,
          });
        }}
        onClick={() => navigate(getUserProfilePageLink({
          userId:id
        }))}
      >
         <FollowedAt followedAt={followedAt}/>
        <div className="flex flex-col gap-2 items-center">
          <UserAvatar avatarSize="large" userProfileImg={profileImgURL} />

          <p>
            <span className="text-fs_base font-semibold text-action-color underline">
              {email}
            </span>
          </p>
          <p>
            <span className="capitalize text-fs_base font-semibold">
              {name}
            </span>
          </p>
           {isMutual? <HiOutlineCheckBadge className={`text-orange-400 absolute right-2 top-1`} size={"24px"}/>:null}
        </div>

       
       
      </div>
    );
  }
);
