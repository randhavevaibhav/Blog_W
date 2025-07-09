import React from "react";
import { Link } from "react-router-dom";

export const EditUserButton = ({userId}) => {
  return (
    <div className="flex justify-end ">
      <Link
        to={`/userprofile/edit/${userId}`}
        className="bg-action-color  shadow hover:bg-[#6057ca]/90 md:px-4 px-4 py-5 md:h-9 h-8 font-medium inline-flex items-center justify-center rounded-md text-white"
      >
        Edit User
      </Link>
    </div>
  );
};
