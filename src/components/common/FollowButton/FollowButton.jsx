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
  const { isFollowed, userId, className = "", isMutual, ...rest } = props;
  const overrideClasses = twMerge(defaultClasses, className);

  const { auth } = useAuth();
  const { accessToken, userId: currentUserId } = auth;
  const isSameUser = parseInt(userId) === parseInt(currentUserId);
  const { showRequireLoginModal, checkLogin, hideLoginModal } = useRequireLogin(
    {
      accessToken,
    },
  );

  const { createFollower } = useCreateFollower({
    currentUserId,
    followingUserId: userId,
    isMutual,
  });

  const { removeFollower } = useRemoveFollower({
    currentUserId,
    followingUserId: userId,
    isMutual,
  });

  //Get current user data
  //Required for optimistic updating follower and following user count
 
    const currentUserData = useGetUserInfo({
      userId: currentUserId?currentUserId:0,
      queryEnable: currentUserId ? true : false,
    });
  

  const handleUserFollow = () => {
    if (isFollowed) {
      removeFollower();
    } else {
      createFollower();
    }
  };

  if (isSameUser) {
    return null;
  }

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
        size={`lg`}
      >
        <span className="tracking-wider">
          {isFollowed ? `Following` : `Follow`}
        </span>
      </Button>
    </>
  );
});
