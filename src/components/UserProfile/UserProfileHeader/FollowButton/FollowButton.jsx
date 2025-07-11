import { Button } from "@/components/ui/button";
import React from "react";

export const FollowButton = ({
  isFollowed,
  followerPending,
  handleUserFollow,
}) => {
  return (
    <div className="flex justify-end ">
      <Button
        onClick={handleUserFollow}
        disabled={followerPending}
        variant={isFollowed ? `ghost` : `action`}
        className={`cursor-pointer ${isFollowed ? `border` : ``}`}
      >
        {isFollowed ? `Following` : `Follow`}
      </Button>
    </div>
  );
};
