import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

export const Follower = forwardRef(
  ({ id, name, email, profileImgURL }, ref) => {
    const { preFetchUserInfo } = usePrefetch();
    return (
      <div
        className=""
        ref={ref}
        onMouseOver={() => {
          preFetchUserInfo({
            userId: id,
          });
        }}
      >
        <div className="flex flex-col gap-2 items-center bg-card-bg rounded-md py-4">
          <Link to={`/userprofile/${id}`}>
            <UserAvatar avatarSize="large" userProfileImg={profileImgURL} />
          </Link>
          <p>
            <Link to={`/userprofile/${id}`} className="cursor-pointer">
              <span className="text-fs_base font-semibold text-action-color underline">
                {email}
              </span>
            </Link>
          </p>
          <p>
            <Link to={`/userprofile/${id}`} className="cursor-pointer">
              <span className="capitalize text-fs_base font-semibold">
                {name}
              </span>
            </Link>
          </p>
        </div>
      </div>
    );
  }
);
