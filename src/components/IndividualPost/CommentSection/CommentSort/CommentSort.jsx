import React, { memo, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
import { useSearchParams } from "react-router-dom";
const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);
const list = {
  likes: {
    name: "Top",
    desc: "Top liked comments will be first",
    value: "likes",
  },
  desc: {
    name: "Latest",
    desc: "Latest comments will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest comments will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];
export const CommentSort = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const selectedListItem = list[sortBy]?list[sortBy]:list["desc"];
  const sortFieldLabel = selectedListItem.name;

  const handleCmtSort = ({ option }) => {
    setSearchParams({
      sort: option,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <SortIconLabel />
      <Suspense
        fallback={<Skeleton className={`h-9 w-14 bg-card-bg`}></Skeleton>}
      >
        <CustomSelect
          handleValueChange={handleCmtSort}
          value={sortBy}
          list={listArray}
          label={sortFieldLabel}
        />
      </Suspense>
    </div>
  );
});
