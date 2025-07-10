import React, { memo } from "react";
import { CommentSort } from "./CommentSort/CommentSort";
import { formatNumber } from "@/utils/utils";

export const Header = memo(({ totalComments, handleCmtSort,changeValue }) => {
  // console.log("header re-render")
  return (
    <div className="flex md:gap-4 gap-2 mb-2">
      <header className="mb-2">
        <h3 className="flex gap-3 text-fs_xl font-semibold">
          Comments
          <span id="total_comments_count">
            {`( ${totalComments ? formatNumber(parseInt(totalComments)) : 0} )`}
          </span>
        </h3>
      </header>
      {totalComments>1?<CommentSort handleCmtSort={handleCmtSort} changeValue={changeValue}/>:null}
    </div>
  );
});
