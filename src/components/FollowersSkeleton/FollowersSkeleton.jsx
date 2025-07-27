import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import "../../pages/Followers/Followers.css";
import { v4 as uuid } from "uuid";

const FollowersSkeletonItem = () => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <Skeleton className="min-h-[200px] w-full  rounded-xl" />
      </div>
    </>
  );
};

export const FollowersSkeleton = ({ count = 1 }) => {
  const arr = new Array(count).fill(0);

  return (
    <>
      <div id="followers_grid">
        {arr.map((item) => {
          return <FollowersSkeletonItem key={uuid()} />;
        })}
      </div>
    </>
  );
};
