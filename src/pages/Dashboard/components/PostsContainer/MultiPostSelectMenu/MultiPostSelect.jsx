import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLocalStorageItem } from "@/utils/browser";
import { getDeleteNPostsPageLink } from "@/utils/getLinks";

import { FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { ArchiveNPostModal } from "./ArchiveNPostModal/ArchiveNPostModal";

export const MultiPostSelect = ({
  selectAllPosts,
  deSelectAllPosts,
  totalSelectedPosts,
  archivePost,
}) => {
  const navigate = useNavigate();
  const localSelectAll = JSON.parse(getLocalStorageItem("selectAllPosts"));

  return (
    <div className="flex gap-3 my-2 flex-wrap items-center flex-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor={`select-all-posts`}
              className="text-sm font-medium leading-none cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                id={`select-all-posts`}
                data-test={`select-all-posts`}
                className="size-5"
                checked={localSelectAll ? localSelectAll : false}
                onCheckedChange={(checked) => {
                  if (!checked) {
                    deSelectAllPosts();
                  } else {
                    selectAllPosts();
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </label>
          </TooltipTrigger>
          <TooltipContent
            side={`bottom`}
            className="md:block hidden text-wrap max-w-[5rem]"
          >
            <p>Select All</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {totalSelectedPosts > 1 ? (
        <>
          <Button
            className={
              "p-2 md:hover:bg-red-500 max-md:h-8 max-md:bg-red-500 md:text-primary md:hover:text-white max-md:hover:bg-red-500"
            }
            variant={"ghost"}
            onClick={() => {
              navigate(getDeleteNPostsPageLink());
            }}
            data-test={"delete-multiple-posts-btn"}
            data-total-selected-posts={totalSelectedPosts}
          >
            <FaTrash className="flex-none flex" />
            <span className="text-base max-md:text-sm tracking-wider">
              Delete {totalSelectedPosts}
            </span>
          </Button>

          <ArchiveNPostModal
            totalSelectedPosts={totalSelectedPosts}
            deSelectAllPosts={deSelectAllPosts}
            archivePost={archivePost}
          />
        </>
      ) : null}
    </div>
  );
};
