import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import { v4 as uuid } from "uuid";

const PostArticleSkeletonItem = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-[50px_auto] gap-4 items-center">
          <Skeleton className="h-[50px]  rounded-full" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 " />
          <Skeleton className="h-4 " />
        </div>
      </div>
    </>
  );
};

export const PostArticleSkeleton = ({ count, className = "" }) => {
  const arr = new Array(count).fill(0);

  return (
    <div data-test={`articles-skeleton`}>
      {arr.map((item) => {
        return <PostArticleSkeletonItem key={uuid()} />;
      })}
    </div>
  );
};
