import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import { useCreateFollower } from "@/hooks/follower/useCreateFollower";
import { useRemoveFollower } from "@/hooks/follower/useRemoveFollower";
import React, { forwardRef } from "react";
import { RequireLoginModal } from "../RequireLoginModal/RequireLoginModal";
import { twMerge } from "tailwind-merge";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";

const defaultClasses = `cursor-pointer disabled:cursor-not-allowed`;
export const FollowButton = forwardRef((props, ref) => {
  const {
    isFollowed,
    currentUserId = 0,
    userId,
    className = "",
    ...rest
  } = props;
  const overrideClasses = twMerge(defaultClasses, className);

  const { auth } = useAuth();
  const { accessToken } = auth;
  const { showRequireLoginModal, checkLogin, hideLoginModal } = useRequireLogin(
    {
      accessToken,
    }
  );

  const { createFollower } = useCreateFollower({
    currentUserId,
    followingUserId: userId,
  });

  const { removeFollower } = useRemoveFollower({
    currentUserId,
    followingUserId: userId,
  });

  //Get current user data
  //Required for optimistic updating follower and following user count
  const currentUserData = useGetUserInfo({
    userId: currentUserId,
    queryEnable: currentUserId ? true : false,
  });

  const handleUserFollow = () => {
    if (isFollowed) {
      removeFollower();
    } else {
      createFollower();
    }
  };
  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => hideLoginModal()} />
      ) : null}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          checkLogin(handleUserFollow);
        }}
        variant={isFollowed ? `ghost` : `action`}
        className={`${isFollowed ? `border` : ``} ${overrideClasses}`}
        {...rest}
        ref={ref}
        data-test={"follow-button"}
        disabled={currentUserId ? currentUserData.isPending : false}
      >
        <span className="tracking-wider">
          {isFollowed ? `Following` : `Follow`}
        </span>
      </Button>
    </>
  );
});
