import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreateBookmark } from "@/hooks/bookmark/useCreateBookmark";
import { useRemoveBookmark } from "@/hooks/bookmark/useRemoveBookmark";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export const BookmarkCompo = ({ bookmarked }) => {
  const { createBookmark } = useCreateBookmark();
  const { removeBookmark } = useRemoveBookmark();

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark();
    } else {
      createBookmark();
    }
  };


  return (
    <div className="flex items-center  gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {bookmarked ? (
              <button onClick={handleBookmark}>
                <FaBookmark className={`cursor-pointer text-fs_3xl`} />
              </button>
            ) : (
              <button onClick={handleBookmark}>
                <FaRegBookmark className={`cursor-pointer text-fs_3xl`} />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{bookmarked?`Remove from Bookmarks`:`Add to Bookmarks`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
