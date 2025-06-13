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
import { LuChevronsRightLeft } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
import React, { useState } from "react";

export const Header = ({ totalComments }) => {
  const [cmtSelection, setCmtSelection] = useState({
    top: true,
    latest: false,
    old: false,
  });

  const handleCmtSort = ({ type }) => {
    switch (type) {
      case "top": {
        setCmtSelection((prev) => ({ top: true, latest: false, old: false }));
        return;
      }

      case "latest": {
        setCmtSelection((prev) => ({ top: false, latest: true, old: false }));
        return;
      }

      case "old": {
        setCmtSelection((prev) => ({ top: false, latest: false, old: true }));
        return;
      }

      default:
        throw new Error("wrong value for the cmt sort type");
    }
  };
  return (
    <div className="flex items-center gap-4">
      <header className="mb-2">
        <h3 className="flex gap-3 text-fs_2xl font-semibold">
          Comments
          <span id="total_comments_count">
            {`( ${totalComments ? totalComments : 0} )`}
          </span>
        </h3>
      </header>
      {/* <div>
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
              onClick={() =>
                handleCmtSort({
                  type: "top",
                })
              }
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
              onClick={() =>
                handleCmtSort({
                  type: "latest",
                })
              }
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
              onClick={() =>
                handleCmtSort({
                  type: "old",
                })
              }
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
      </div> */}
    </div>
  );
};
