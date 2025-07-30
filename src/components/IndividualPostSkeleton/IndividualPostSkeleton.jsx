import React from "react";
import { MainLayout } from "../common/MainLayout/MainLayout";
import { Skeleton } from "../ui/skeleton";

export const IndividualPostSkeleton = () => {
  return (
    <MainLayout className={``}>
      <div className="md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3 md:mt-20 mt-12 md:pt-0 pt-4 px-2 py-2 flex flex-col" data-test={`individual-post-page-skeleton`}>
        <Skeleton className=" h-scminushdminusfoot w-full" />
        <div className="">
          <Skeleton className="md:h-full h-10 w-full" />
        </div>
        <aside className="md:block hidden">
          <Skeleton className="h-1/2" />
        </aside>
      </div>
    </MainLayout>
  );
};
