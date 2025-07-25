import { Skeleton } from "@/components/ui/skeleton";
import React, { forwardRef } from "react";

import { v4 as uuid } from "uuid";
import { MainLayout } from "../MainLayout/MainLayout";

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

export const PostArticleSkeleton = ({count}) => {
 
  const arr = new Array(count).fill(0);
  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="max-w-[36rem] mx-auto flex flex-col space-y-6">
          {arr.map((item) => {
            return <PostArticleSkeletonItem key={uuid()} />;
          })}
        </div>
      </MainLayout>
    </>
  );
}
