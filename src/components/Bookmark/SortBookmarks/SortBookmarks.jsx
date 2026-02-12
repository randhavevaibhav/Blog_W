import { SortIconLabel } from "@/components/common/SortIconLabel/SortIconLabel";
import { Skeleton } from "@/components/ui/skeleton";
import React, { lazy, memo, Suspense } from "react";
import { useSearchParams } from "react-router-dom";

const CustomSelect = lazy(
  () => import("@/components/common/CustomSelect/CustomSelect"),
);

const list = {
  desc: {
    name: "Latest",
    desc: "Latest bookmarks will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest bookmarks will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];

export const SortBookmarks = memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtag")
    ? searchParams.get("hashtag")
    : 0;
  const selectedListItem = list[sortBy]?list[sortBy]:list["desc"];
  const sortFieldLabel = selectedListItem.name;

  const handleSortByChange = ({ option }) => {
    setSearchParams({
      sort: option,
      hashtag:hashtagId,
    });
  };
  return (
    <>
      <div className="flex gap-2 w-fit mb-3 items-center">
        <SortIconLabel />

        <Suspense fallback={<Skeleton className={`h-9 w-14 bg-card-bg`}></Skeleton>}>
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
});
