
import React from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2";
export const MutualFollow = ({ isMutual }) => {
  if (!isMutual) {
    return null;
  }
  return (
    <div className="flex gap-2 items-center text-orange-400">
      <p className=" ">Mutual friends !</p>
      <HiOutlineCheckBadge size={"22px"}/>
    </div>
  );
};
