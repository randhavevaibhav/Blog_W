import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import { useCreateFollower } from "@/hooks/follower/useCreateFollower";
import { useRemoveFollower } from "@/hooks/follower/useRemoveFollower";
import React, { useState } from "react";
import { RequireLoginModal } from "../RequireLoginModal/RequireLoginModal";

const FollowButton = ({
  isFollowed,
  currentUserId,
  userId,
  pendingFlag = false,
}) => {
  const { auth } = useAuth();
  const { accessToken } = auth;
  const { showRequireLoginModal, checkLogin, hideLoginModal } = useRequireLogin(
    {
      accessToken,
    }
  );

  const {
    createFollower,
    isPending: isCreateFollowerPending,
    isError: isCreateFollowerError,
    error: createFollowerError,
  } = useCreateFollower({
    currentUserId,
    followingUserId: userId
  });

  const {
    removeFollower,
    isPending: isRemoveFollowerPending,
    isError: isCreateFollowingError,
    error: createFollowingError,
  } = useRemoveFollower({
    currentUserId,
    followingUserId: userId,
  });
  const [followState, setFollowState] = useState(isFollowed);

  const followerPending =
    isCreateFollowerPending || isRemoveFollowerPending || pendingFlag;

  const isFollowerError = isCreateFollowerError || isCreateFollowingError;
  const followerError = createFollowerError || createFollowingError;

  const handleUserFollow = () => {
    if (isFollowerError) {
      console.error("Error ===> ", followerError);
    } else {
      if (followState) {
        setFollowState(false);

        removeFollower();
      } else {
        setFollowState(true);
        createFollower();
      }
    }
  };
  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => hideLoginModal()} />
      ) : null}
      <Button
        onClick={() => checkLogin(handleUserFollow)}
        disabled={followerPending}
        variant={
          followerError ? `destructive` : followState ? `ghost` : `action`
        }
        className={`cursor-pointer ${followState ? `border` : ``} ${
          followerPending ? `cursor-not-allowed` : ``
        }`}
      >
        <span className="tracking-wider">
          {followerError ? `Error` : followState ? `Following` : `Follow`}
        </span>
      </Button>
    </>
  );
};

export default FollowButton;
