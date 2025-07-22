import { CustomSelect } from "@/components/common/CustomSelect/CustomSelect";
import React from "react";
const list = [
  {
    name: "Title",
    desc: "A to Z",
    value: "name",
  },
  {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest posts will be first",
    value: "asc",
  },
];

export const SortPosts = ({ handleSortByChange, sortBy }) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <CustomSelect
          handleValueChange={handleSortByChange}
          value={sortBy}
          list={list}
        />
      </div>
    </>
  );
};
