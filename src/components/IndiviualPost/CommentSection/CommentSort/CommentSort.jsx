import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuChevronsRightLeft } from "react-icons/lu";

export const CommentSort = ({ handleCmtSort = () => {} }) => {
  const localCmtSort = getLocalStorageItem("cmtSort");
  const [cmtSelection, setCmtSelection] = useState({
    top: localCmtSort === "top" ? true : false,
    latest: localCmtSort === "latest" ? true : false,
    old: localCmtSort === "old" ? true : false,
  });

  return (
    <div>
      <DropdownMenu>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger className="focus:border-none focus:outline-none hover:bg-action-color px-2 py-1 rounded-md">
                <LuChevronsRightLeft size={"25px"} />
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>sort comments</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent
          side="right"
          className="flex flex-col gap-3 md:mb-0 mb-4"
          sideOffset={20}
        >
          <DropdownMenuItem
            className="relative focus:bg-action-color cursor-pointer"
            onClick={() => {
              setLocalStorageItem("cmtSort", "top");
              setCmtSelection(() => ({ top: true, latest: false, old: false }));
              handleCmtSort({
                type: "top",
              });
            }}
          >
            <div className="pl-8">
              {cmtSelection.top ? (
                <FaCheck className="absolute left-2 top-2" />
              ) : null}
              <h4 className="text-fs_lg">Top</h4>
              <p>Top liked comments</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="relative focus:bg-action-color cursor-pointer"
            onClick={() => {
              setLocalStorageItem("cmtSort", "latest");
              setCmtSelection(() => ({ top: false, latest: true, old: false }));
              handleCmtSort({
                type: "latest",
              });
            }}
          >
            <div className="pl-8">
              {cmtSelection.latest ? (
                <FaCheck className="absolute left-2 top-2" />
              ) : null}
              <h4 className="text-fs_lg">Latest</h4>
              <p>Most recent comments</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-col items-start focus:bg-action-color cursor-pointer"
            onClick={() => {
              setLocalStorageItem("cmtSort", "old");
              setCmtSelection(() => ({ top: false, latest: false, old: true }));
              handleCmtSort({
                type: "old",
              });
            }}
          >
            <div className="pl-8">
              {cmtSelection.old ? (
                <FaCheck className="absolute left-2 top-2" />
              ) : null}
              <h4 className="text-fs_lg">Oldest</h4>
              <p>Oldest comment first</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
