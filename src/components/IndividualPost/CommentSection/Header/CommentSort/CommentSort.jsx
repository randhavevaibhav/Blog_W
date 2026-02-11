import React, { memo, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
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
export const CommentSort = memo(
  ({ handleCmtSort = () => {}, changeValue = "desc" }) => {
    const selectedListItem = list[changeValue];
    const sortFieldLabel = selectedListItem.name;
    return (
      <div className="flex items-center gap-2">
        <SortIconLabel/>
        <Suspense fallback={<Skeleton className={`h-9 w-14`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleCmtSort}
            value={changeValue}
            list={listArray}
            label={sortFieldLabel}
          />
        </Suspense>
      </div>
    );
  },
);
