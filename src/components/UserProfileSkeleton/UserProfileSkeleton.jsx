import React from "react";
import { Skeleton } from "../ui/skeleton";
import { MainLayout } from "../common/MainLayout/MainLayout";

const UserProfileSkeleton = () => {
  return (
    <MainLayout className="mb-0 md:p-1 p-2">
      <div className="max-w-[1024px] md:mx-auto mx-2 pt-2 pb-2">
        <div className="flex flex-col items-center w-full justify-center gap-4">
          <Skeleton className="h-[100px] w-[100px] rounded-full bg-card-bg" />

          <div className="flex items-center justify-center flex-col space-y-2 w-full">
            <Skeleton className="h-4 w-1/3 bg-card-bg" />
            <Skeleton className="h-4 w-1/2 bg-card-bg" />
            <Skeleton className="h-4 w-1/2 bg-card-bg" />
          </div>
          <div className="md:grid md:grid-cols-[250px_1fr] gap-10 w-full">
            <Skeleton className="md:h-96 h-52 mb-6 bg-card-bg" />
            <Skeleton className="md:h-96 h-52 bg-card-bg" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfileSkeleton;
