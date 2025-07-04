import { Button } from "@/components/ui/button";
import React from "react";

export const FollowButton = ({isFollowed,followerPending,handleUserFollow}) => {
  return (
    <div className="flex justify-end ">
      <Button onClick={handleUserFollow} disabled={followerPending}>
        {isFollowed ? `Un-Follow` : `Follow`}
      </Button>
    </div>
  );
};
