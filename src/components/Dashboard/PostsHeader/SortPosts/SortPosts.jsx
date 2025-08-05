import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
const CustomSelect = lazy(() =>
  import("@/components/common/CustomSelect/CustomSelect")
);
const list = [
  {
    name: "Title",
    desc: "A to Z",
    value: "name",
  },
  {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest posts will be first",
    value: "asc",
  },
];

export const SortPosts = ({ handleSortByChange, sortBy }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Suspense fallback={<Skeleton className={`h-9 w-14`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleSortByChange}
            value={sortBy}
            list={list}
          />
        </Suspense>
        
      </div>
    </>
  );
};
