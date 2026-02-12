import React from "react";
import { BiSortAlt2 } from "react-icons/bi";

export const SortIconLabel = () => {
  return (
    <div className="flex gap-2 items-center">
      <BiSortAlt2 size={"24px"} />
      <h4 className="tracking-wide">Sort</h4>
    </div>
  );
};
