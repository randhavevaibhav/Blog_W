import React from "react";
import { FaFilter } from "react-icons/fa";

export const FilterIconLabel = () => {
  return (
    <div className="flex gap-2 items-center">
      <FaFilter size={"16px"} />
      <h4 className="font-semibold tracking-wide text-lg">Filter</h4>
    </div>
  );
};
