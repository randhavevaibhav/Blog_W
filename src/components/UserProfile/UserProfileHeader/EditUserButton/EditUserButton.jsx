import { getUpdateUserPageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const defaultClasses = `flex justify-end`;

export const EditUserButton = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div className={overrideClasses} ref={ref}>
      <Link
        to={getUpdateUserPageLink()}
        className="bg-action-color  shadow hover:bg-[#6057ca]/90 md:px-4 px-4 py-5 md:h-9 h-8 font-medium inline-flex items-center justify-center rounded-md text-white"
      >
        Edit User
      </Link>
    </div>
  );
});
