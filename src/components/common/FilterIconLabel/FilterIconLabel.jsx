import React from "react";
import { FaFilter } from "react-icons/fa";

export const FilterIconLabel = () => {
  return (
    <div className="flex gap-2 items-center">
      <FaFilter size={"16px"} />
      <h4 className="text-base tracking-wide">Filter</h4>
    </div>
  );
};
