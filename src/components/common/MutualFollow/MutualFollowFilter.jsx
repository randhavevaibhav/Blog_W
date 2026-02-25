import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterIconLabel } from "../FilterIconLabel/FilterIconLabel";

const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);

const list = {
  false: {
    name: "All",
    desc: "All followers",
    value: "false",
  },
  true: {
    name: "Mutual",
    desc: "Only Mutual followers",
    value: "true",
  },
};

const listArray = [...Object.values(list)];

export const MutualFollowFilter = ({
  disable=false
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const mutual = searchParams.get("mutual")
    ? searchParams.get("mutual")
    : "false";

  const selectedListItem = list[mutual]?list[mutual]:list["false"];
  const filterFieldLabel = selectedListItem.name;

  const handleFilterChange = ({ option }) => {
    setSearchParams({
      sort,
      mutual: option,
    });
  };
  return (
    <div className="flex gap-4 w-fit">
       <FilterIconLabel/>
      <Suspense fallback={<Skeleton className={`h-9 w-auto bg-skeleton-bg`}></Skeleton>}>
        <CustomSelect
          handleValueChange={handleFilterChange}
          value={mutual}
          list={listArray}
          label={filterFieldLabel}
          disableSelect={disable}
        />
      </Suspense>
    </div>
  );
};
