import React, { memo, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const CustomSelect = lazy(() =>
  import("@/components/common/CustomSelect/CustomSelect")
);
const list = [
  {
    name: "Top",
    desc: "Top liked comments will be first",
    value: "likes",
  },
  {
    name: "Latest",
    desc: "Latest comments will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest comments will be first",
    value: "asc",
  },
];

export const CommentSort = memo(
  ({ handleCmtSort = () => {}, changeValue = "desc" }) => {
    return (
      <div>
        <Suspense fallback={<Skeleton className={`h-9 w-14`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleCmtSort}
            value={changeValue}
            list={list}
          />
        </Suspense>
        
      </div>
    );
  }
);
