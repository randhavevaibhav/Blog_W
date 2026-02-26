import React, { memo } from "react";
import { formatNumber } from "@/utils/utils";


export const Header = memo(({ totalComments }) => {
  
  return (
    <div className="flex md:gap-4 gap-2 mb-2 items-center">
      <header className="">
        <h3 className="flex gap-3 text-fs_xl font-semibold">
          Comments
          <span id="total_comments_count">
            {`( ${totalComments ? formatNumber(parseInt(totalComments)) : 0} )`}
          </span>
        </h3>
      </header>
      
    </div>
  );
});
