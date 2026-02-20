import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { twMerge } from "tailwind-merge";

import { v4 as uuid } from "uuid";

const PostArticleSkeletonItem = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-[50px_auto] gap-4 items-center">
          <Skeleton className="h-[50px]  rounded-full bg-skeleton-bg" />
          <Skeleton className="h-20 rounded-xl bg-skeleton-bg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 bg-skeleton-bg" />
          <Skeleton className="h-4 bg-skeleton-bg" />
        </div>
      </div>
    </>
  );
};

export const PostArticleSkeleton = ({ count, className = "" }) => {
  const defaultClasses = `flex flex-col space-y-3`;
  const arr = new Array(count).fill(0);
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div data-test={`articles-skeleton`} className={overrideClasses}>
      {arr.map((item) => {
        return <PostArticleSkeletonItem key={uuid()} />;
      })}
    </div>
  );
};
