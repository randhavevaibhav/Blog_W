import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/utils/utils";

import { memo } from "react";
import { AiOutlineMessage } from "react-icons/ai";

export const CommentsCompo = memo(({ commentsCount }) => {
  // console.log("CommentsCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center md:flex-col ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() =>
                  document
                    .getElementById("comments")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="py-2 px-2"
                data-test={`comment`}
              >
                <AiOutlineMessage
                  className={`cursor-pointer hover:text-[#f59e0b]  duration-200`}
                  size={`24px`}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side={`bottom`} className="md:block hidden text-wrap max-w-[5rem]">
              <p>Jump to comments</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-fs_base">
          {commentsCount ? formatNumber(parseInt(commentsCount)) : 0}
        </span>
      </div>
    </>
  );
});
