import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { SortIconLabel } from "../SortIconLabel/SortIconLabel";

const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);

const list = {
  desc: {
    name: "Latest",
    desc: "Latest Followed users will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest Followed users will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];


export const SortFollower = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";

  const mutual = searchParams.get("mutual")
    ? searchParams.get("mutual")
    : "false";

  const selectedListItem = list[sort]?list[sort]:list["desc"];
  const sortFieldLabel = selectedListItem.name;

  const handleSortByChange = ({ option }) => {
    setSearchParams({
      sort: option,
      mutual,
    });
  };
  return (
    <div className="flex gap-4 w-fit">
       <SortIconLabel/>
      <Suspense fallback={<Skeleton className={`h-9 w-auto bg-card-bg`}></Skeleton>}>
        <CustomSelect
          handleValueChange={handleSortByChange}
          value={sort}
          list={listArray}
          label={sortFieldLabel}
          dataTest="follower"
        />
      </Suspense>
    </div>
  )
}
