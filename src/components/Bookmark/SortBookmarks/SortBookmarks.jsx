import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { memo } from "react";
import { FaSort } from "react-icons/fa";

export const SortBookmarks = memo(({ handleSortByChange, sortBy }) => {
  return (
    <Select
      onValueChange={(value) => {
        handleSortByChange({ option: value });
      }}
      value={sortBy}
      defaultValue="desc"
      className=""
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild className="w-fit ml-auto">
            <div>
              <SelectTrigger className="focus:outline-none px-2 py-2 outline-none focus:ring-0 ring-0 items-center justify-center rounded-md  md:hover:bg-action-color md:hover:text-white duration-200">
                <FaSort className="" size={"24px"} />
              </SelectTrigger>
            </div>
          </TooltipTrigger>
          <TooltipContent side={`right`} className={`md:block hidden`}>
            Sort Bookmarks
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent className={`!min-w-[200px]`}>
        <SelectItem
          value="desc"
          className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
        >
          <div className="ml-4">
            <h4 className="font-semibold !text-fs_lg">Latest</h4>
            <span className="text-fs_xs ">Latest bookmarks will be first</span>
          </div>
        </SelectItem>
        <SelectItem
          value="asc"
          className="cursor-pointer px-6 py-2 focus:bg-action-color focus:text-white gap-4"
        >
          <div className="ml-4">
            <h4 className="font-semibold !text-fs_lg">Oldest</h4>
            <span className="text-fs_xs">Oldest bookmarks will be first</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
});
