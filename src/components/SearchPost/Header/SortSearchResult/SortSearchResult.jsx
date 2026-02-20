import React, { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
import { useSearchParams } from "react-router-dom";
const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);

const list = {
  desc: {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "oldest posts will be first",
    value: "asc",
  },
};
const listArray = [...Object.values(list)];
export const SortSearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hashtag = searchParams.get("hashtag") ? searchParams.get("hashtag") : 0;
  const query = searchParams.get("query") ? searchParams.get("query") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const selectedListItem = list[sort]?list[sort]: list["desc"];
  const sortFieldLabel = selectedListItem.name;

  const handleSearchSortChange = ({option}) => {
    setSearchParams({
      hashtag,
      query,
      sort:option,
    });
  };



  return (
    <>
      <div className="flex gap-2 items-center w-fit">
        <SortIconLabel />
        <Suspense fallback={<Skeleton className={`h-9 w-14 bg-skeleton-bg`}></Skeleton>}>
          <CustomSelect
            handleValueChange={handleSearchSortChange}
            value={sort}
            list={listArray}
            label={sortFieldLabel}
          />
        </Suspense>
      </div>
    </>
  );
};
