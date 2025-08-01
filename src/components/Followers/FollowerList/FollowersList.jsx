import React, { forwardRef } from "react";
import { Follower } from "../../common/Follower/Follower";
import { v4 as uuidv4 } from "uuid";
import { FollowersSkeletonItem } from "@/components/FollowersSkeleton/FollowersSkeleton";
export const FollowersList = forwardRef(({ followers, isFetching }, ref) => {
  const thirdLastElementIndex = followers.length > 1 ? followers.length - 2 : 0;

  return (
    <div id="followers_grid">
      {followers.map((follower, i) => {
        const { followerId, profileImgURL, followerName, followerMail } =
          follower;
        return (
          <Follower
            id={followerId}
            profileImgURL={profileImgURL}
            name={followerName}
            email={followerMail}
            key={uuidv4()}
            ref={thirdLastElementIndex === i + 1 ? ref : null}
          />
        );
      })}

      {isFetching ? (
        <>
          <FollowersSkeletonItem />
          <FollowersSkeletonItem />
          <FollowersSkeletonItem />
        </>
      ) : null}
    </div>
  );
});
