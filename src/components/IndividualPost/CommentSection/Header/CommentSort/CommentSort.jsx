
import React, { memo } from "react";
import { CustomSelect } from "@/components/common/CustomSelect/CustomSelect";
const list = [
  {
    name: "Top",
    desc: "Top liked comments will be first",
    value: "likes",
  },
  {
    name: "Latest",
    desc: "Latest comments will be first",
    value: "desc",
  },
  {
    name: "Oldest",
    desc: "Oldest comments will be first",
    value: "asc",
  },
];

export const CommentSort = memo(
  ({ handleCmtSort = () => {}, changeValue = "desc" }) => {
   
    return (
     <div>
       <CustomSelect handleValueChange={handleCmtSort} value={changeValue} list={list}/>
     </div>
    );
  }
);
