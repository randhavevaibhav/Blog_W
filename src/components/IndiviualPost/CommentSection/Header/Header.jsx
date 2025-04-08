import React from "react";

export const Header = ({ totalComments }) => {
  return (
    <header className="text-2xl font-bold flex gap-4 mb-2">
      <h2>Comments</h2>

      <span id="total_comments_count">
        {`( ${totalComments ? totalComments : 0} )`}
      </span>
    </header>
  );
};
