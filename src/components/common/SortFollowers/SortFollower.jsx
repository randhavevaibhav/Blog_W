import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { SortIconLabel } from "../SortIconLabel/SortIconLabel";

const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);

export const SortFollower = ({list,listArray,offset}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";

  const mutual = searchParams.get("mutual")
    ? searchParams.get("mutual")
    : "false";

  const selectedListItem = list[sort];
  const sortFieldLabel = selectedListItem.name;

  const handleSortByChange = ({ option }) => {
    setSearchParams({
      sort: option,
      offset,
      mutual,
    });
  };
  return (
    <div className="flex gap-4 w-fit">
       <SortIconLabel/>
      <Suspense fallback={<Skeleton className={`h-9 w-auto`}></Skeleton>}>
        <CustomSelect
          handleValueChange={handleSortByChange}
          value={sort}
          list={listArray}
          label={sortFieldLabel}
        />
      </Suspense>
    </div>
  )
}
