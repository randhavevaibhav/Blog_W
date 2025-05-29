import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { memo } from "react";
import { AiOutlineMessage } from "react-icons/ai";

export const CommentsCompo = memo(({ commentsCount }) => {
  // console.log("CommentsCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center md:flex-col md:gap-1 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() =>
                  document
                    .getElementById("comments")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                <AiOutlineMessage className={`cursor-pointer text-fs_3xl`} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-fs_base">
          {commentsCount ? commentsCount : 0}
        </span>
      </div>
    </>
  );
});
