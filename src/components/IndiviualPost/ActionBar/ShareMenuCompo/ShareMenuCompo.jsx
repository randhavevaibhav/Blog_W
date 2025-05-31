import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaShare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { LinkedinShareButton } from "react-share";

export const ShareMenuCompo = () => {
  return (
    <div>
      <DropdownMenu>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger className="focus:border-none focus:outline-none">
                <FaShare className={`cursor-pointer text-fs_2xl`} />
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent
          side="right"
          className="flex flex-col gap-3 md:mb-0 mb-4"
          sideOffset={20}
        >
          <DropdownMenuItem>
            <LinkedinShareButton
              url={window.location.href}
              title={"test title for my page"}
              summary={"test summary of post"}
              source={`blog-three.vercel.com`}
            >
              LinkedIn
              <FaLinkedin size={`20px`} />
            </LinkedinShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              className="text-fs_base cursor-pointer flex justify-between w-full items-center"
              target="_blank"
              href={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
            >
              Facebook
              <FaFacebook size={`20px`} />
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a
              className="text-fs_base cursor-pointer flex justify-between w-full items-center"
              target="_blank"
              href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
            >
              Twitter
              <FaXTwitter size={`20px`} />
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
