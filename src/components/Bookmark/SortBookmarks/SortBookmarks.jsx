import { CustomSelect } from "@/components/common/CustomSelect/CustomSelect";

import React, { memo } from "react";

const list = [
  {
    name: "Latest",
    desc: "Latest bookmarks will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest bookmarks will be first",
    value: "asc",
  },
];

export const SortBookmarks = memo(({ handleSortByChange, sortBy }) => {
  return (
    <>
      <div className="flex items-center ml-auto w-fit">
        <CustomSelect
          handleValueChange={handleSortByChange}
          value={sortBy}
          list={list}
        />
      </div>
    </>
  );
});
