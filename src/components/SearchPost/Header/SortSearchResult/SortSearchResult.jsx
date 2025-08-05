import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const CustomSelect = lazy(() =>
  import("@/components/common/CustomSelect/CustomSelect")
);

const list = [
  {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "oldest posts will be first",
    value: "asc",
  },
];

export const SortSearchResult = ({ handleSearchSort, sortBy }) => {
  return (
    <>
      <div>
        <Suspense fallback={<Skeleton className={`h-9 w-14`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleSearchSort}
            value={sortBy}
            list={list}
          />
        </Suspense>
      </div>
    </>
  );
};
