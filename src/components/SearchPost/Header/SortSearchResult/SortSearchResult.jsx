import { CustomSelect } from "@/components/common/CustomSelect/CustomSelect";
import React from "react";


const list = [
  {
    name: "Latest",
    desc: "Latest posts will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "oldest posts will be first",
    value: "asc",
  },
];

export const SortSearchResult = ({ handleSearchSort, sortBy }) => {
  return (
    <>
      <div>
        <CustomSelect
          handleValueChange={handleSearchSort}
          value={sortBy}
          list={list}
        />
      </div>
    </>
  );
};
