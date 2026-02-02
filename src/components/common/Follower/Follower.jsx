import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getUserProfilePageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

export const Follower = forwardRef(
  ({ id, name, email, profileImgURL }, ref) => {
    const { preFetchUserInfo } = usePrefetch();
    const navigate = useNavigate();
    return (
      <div
        className="cursor-pointer"
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
        <div className="flex flex-col gap-2 items-center bg-card-bg rounded-md py-4">
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
        </div>
      </div>
    );
  }
);
