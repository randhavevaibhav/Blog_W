import React from "react";
import { Skeleton } from "../ui/skeleton";
import { MainLayout } from "../common/MainLayout/MainLayout";

const UserProfileSkeleton = () => {
  return (
    <MainLayout className="mb-0 md:p-1 p-2">
      <div className="max-w-[1024px] md:mx-auto mx-2 pt-2 pb-2">
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col items-center w-full justify-center gap-4">
            <Skeleton className="h-[100px] w-[100px] rounded-full" />

            <div className="flex items-center justify-center flex-col space-y-2 w-full">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="grid grid-cols-[250px_1fr] gap-10 w-full">
              <Skeleton className="h-96 " />
              <Skeleton className="h-96 " />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfileSkeleton;
