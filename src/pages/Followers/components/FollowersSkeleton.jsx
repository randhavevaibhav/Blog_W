import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import "@/pages/Followers/Followers.css";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";

export const FollowersSkeletonItem = () => {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <Skeleton className="min-h-[200px] w-full  rounded-xl bg-skeleton-bg" />
      </div>
    </>
  );
};

export const FollowersSkeleton = ({ count = 1 ,className=``}) => {
  const defaultClasses = ``
  const arr = new Array(count).fill(0);
 const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <div id="followers_grid" className={overrideClasses}>
        {arr.map((item) => {
          return <FollowersSkeletonItem key={uuid()} />;
        })}
      </div>
    </>
  );
};
