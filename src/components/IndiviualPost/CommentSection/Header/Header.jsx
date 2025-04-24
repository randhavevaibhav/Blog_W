import React from "react";

export const Header = ({ totalComments }) => {
  return (
    <header className="mb-2">
      <h3 className="flex gap-3 text-fs_2xl font-semibold">Comments

      <span id="total_comments_count">
        {`( ${totalComments ? totalComments : 0} )`}
      </span>
      </h3>

     
    </header>
  );
};
