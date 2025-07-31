import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Follower } from "../common/Follower/Follower";
import { FollowersSkeletonItem } from "../FollowersSkeleton/FollowersSkeleton";
export const FollowingsList = forwardRef(({ followings, isFetching }, ref) => {
  const thirdLastElementIndex =
    followings.length > 1 ? followings.length - 2 : 0;
  return (
    <div id="followers_grid">
      {followings.map((followingUser, i) => {
        const {
          followingUserId,
          profileImgURL,
          followingUserName,
          followingUserMail,
        } = followingUser;

        return (
          <>
            <Follower
              id={followingUserId}
              name={followingUserName}
              email={followingUserMail}
              profileImgURL={profileImgURL}
              key={uuidv4()}
              ref={thirdLastElementIndex === i + 1 ? ref : null}
            />
          </>
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
