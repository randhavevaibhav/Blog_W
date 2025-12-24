import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, memo, Suspense } from "react";
const CustomSelect = lazy(() =>
  import("@/components/common/CustomSelect/CustomSelect")
);
const list = [
  {
    name: "Latest",
    desc: "Latest bookmarks will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest bookmarks will be first",
    value: "asc",
  },
];

export const SortBookmarks = memo(({ handleSortByChange, sortBy }) => {
  return (
    <>
      <div className="flex items-center ml-auto w-fit mb-3">
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
});
