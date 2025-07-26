import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import { v4 as uuid } from "uuid";
import { MainLayout } from "../MainLayout/MainLayout";
import { twMerge } from "tailwind-merge";

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

const defaultClasses = `md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`;
export const PostArticleSkeleton = ({ count, className = "" }) => {
  const arr = new Array(count).fill(0);
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <MainLayout className={overrideClasses}>
        <div className="max-w-[36rem] mx-auto flex flex-col space-y-6">
          {arr.map((item) => {
            return <PostArticleSkeletonItem key={uuid()} />;
          })}
        </div>
      </MainLayout>
    </>
  );
};
