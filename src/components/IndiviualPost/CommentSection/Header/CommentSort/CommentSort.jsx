
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


import React, { memo } from "react";


export const CommentSort = memo(({ handleCmtSort = () => {} }) => {
//  console.log("CommentSort re-render ")
  return (
    <div>
     
        <Select
          onValueChange={(value) => handleCmtSort({ type: value })}
         
        >
          <SelectTrigger className="w-[180px] focus:outline-none">
            <SelectValue placeholder="sort comments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc" className="cursor-pointer">Latest</SelectItem>
            <SelectItem value="asc"className="cursor-pointer">Oldest</SelectItem>
            <SelectItem value="likes"className="cursor-pointer">Top liked</SelectItem>
          </SelectContent>
        </Select>

    </div>
  );
})