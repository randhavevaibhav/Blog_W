import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
const CustomSelect = lazy(() =>
  import("@/components/common/CustomSelect/CustomSelect")
);
const list = {
  "name":{
    name: "Title",
    desc: "A to Z",
    value: "name",
  },
  "desc":{
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  "asc":{
    name: "Oldest",
    desc: "Oldest posts will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];

export const SortPosts = ({ handleSortByChange, sortBy }) => {
  const selectedListItem = list[sortBy];
  const sortFieldLabel = selectedListItem.name;
  return (
    <>
      <div className="flex items-center gap-4">
         <SortIconLabel/>
        <Suspense fallback={<Skeleton className={`h-9 w-14`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleSortByChange}
            value={sortBy}
            list={listArray}
            label={sortFieldLabel}
          />
        </Suspense>
        
      </div>
    </>
  );
};
