import React, { memo } from "react";
import { CommentSort } from "./CommentSort/CommentSort";

export const Header = memo(({ totalComments ,handleCmtSort}) => {
  // console.log("header re-render")
  return (
    <div className="flex items-center md:gap-4 gap-2 mb-2">
      <header className="mb-2">
        <h3 className="flex gap-3 text-fs_xl font-semibold">
          Comments
          <span id="total_comments_count">
            {`( ${totalComments ? totalComments : 0} )`}
          </span>
        </h3>
      </header>
       <CommentSort handleCmtSort={handleCmtSort} />
    </div>
  );
})
