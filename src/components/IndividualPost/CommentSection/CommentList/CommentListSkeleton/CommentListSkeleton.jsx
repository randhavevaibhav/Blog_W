import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { twMerge } from "tailwind-merge";


const CommentListSkeletonItem = (props) => {
  const {className,...rest} = props;
  const defaultClasses = `flex flex-col space-y-3`;
   const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <div className={overrideClasses} {...rest}>
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
      <div className={overrideClasses} data-test={`comment-skeleton`}>
        <div className="max-w-[36rem] py-2 mx-auto flex flex-col space-y-6">
          <CommentListSkeletonItem className={``}/>
          <CommentListSkeletonItem className={`ml-8`}/>
          <CommentListSkeletonItem className={``}/>
          <CommentListSkeletonItem className={`ml-8`}/>
           <CommentListSkeletonItem className={`ml-10`}/>
          <CommentListSkeletonItem className={``}/>
        </div>
      </div>
    </>
  );
};
