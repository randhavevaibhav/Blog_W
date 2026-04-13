import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);
const list = {
  name: {
    name: "Title",
    desc: "A to Z",
    value: "name",
  },
  desc: {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest posts will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];

export const SortPosts = ({disable=false}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
    const archive = searchParams.get("archive") ? searchParams.get("archive") : 0;

  const selectedListItem = list[sort]?list[sort]:list["desc"];
  const sortFieldLabel = selectedListItem.name;

  const handleSortByChange = ({ option }) => {
    setSearchParams({
       target:"posts",
      sort: option,
      archive
    });
  };
  return (
    <>
      <div className="flex items-center gap-4 justify-end">
        <SortIconLabel />
        <Suspense fallback={<Skeleton className={`h-9 w-14 bg-skeleton-bg`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleSortByChange}
            value={sort}
            list={listArray}
            label={sortFieldLabel}
            disableSelect={disable}
          />
        </Suspense>
      </div>
    </>
  );
};
