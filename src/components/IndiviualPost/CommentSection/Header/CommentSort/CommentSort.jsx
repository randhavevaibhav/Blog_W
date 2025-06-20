import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { LuChevronsRightLeft } from "react-icons/lu";
import React, { memo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const CommentSort = memo(({ handleCmtSort = () => {} }) => {
  //  console.log("CommentSort re-render ")
  return (
    <div>
      <Select
        onValueChange={(value) => handleCmtSort({ type: value })}
        defaultValue="desc"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger className=" size-8 focus:outline-none p-0 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md">
                <LuChevronsRightLeft className=" size-8 hover:bg-action-color rounded-md hover:text-white duration-100" />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>Sort comments</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SelectContent className={`!min-w-[250px]`}>
          <SelectItem
            value="likes"
            className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
          >
            <div className="ml-4">
              <h4 className="font-semibold !text-fs_lg">Top</h4>
              <span className="text-fs_xs">
                Top liked comments will be first
              </span>
            </div>
          </SelectItem>
          <SelectItem
            value="desc"
            className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
          >
            <div className="ml-4">
              <h4 className="font-semibold !text-fs_lg">Latest</h4>
              <span className="text-fs_xs">Latest comments will be first</span>
            </div>
          </SelectItem>
          <SelectItem
            value="asc"
            className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
          >
            <div className="ml-4">
              <h4 className="font-semibold !text-fs_lg">Oldest</h4>
              <span className="text-fs_xs">oldest comments will be first</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});
