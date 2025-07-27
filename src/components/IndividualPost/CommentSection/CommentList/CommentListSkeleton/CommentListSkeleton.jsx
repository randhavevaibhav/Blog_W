import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import { v4 as uuid } from "uuid";

import { twMerge } from "tailwind-merge";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";

const CommentListSkeletonItem = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="grid grid-cols-[50px_auto] gap-4 items-center">
          <Skeleton className="h-[50px]  rounded-full" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
      </div>
    </>
  );
};

const defaultClasses = ``;
export const CommentListSkeleton = ({ count, className = "" }) => {
  const arr = new Array(count).fill(0);
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <div className={overrideClasses}>
        <div className="max-w-[36rem] py-2 mx-auto flex flex-col space-y-6">
          {arr.map((item) => {
            return <CommentListSkeletonItem key={uuid()} />;
          })}
        </div>
      </div>
    </>
  );
};
