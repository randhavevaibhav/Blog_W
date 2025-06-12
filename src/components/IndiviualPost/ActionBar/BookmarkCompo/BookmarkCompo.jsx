import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/auth/useAuth";
import { useCreateBookmark } from "@/hooks/bookmark/useCreateBookmark";
import { useRemoveBookmark } from "@/hooks/bookmark/useRemoveBookmark";
import React, { memo, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export const BookmarkCompo =memo( ({ bookmarked }) => {
  const { createBookmark } = useCreateBookmark();
  const { removeBookmark } = useRemoveBookmark();
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);
  const { auth } = useAuth();
  const { accessToken } = auth;

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark();
    } else {
      createBookmark();
    }
  };

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return;
    }
  };
// console.log("bookmark re-render")
  return (
   <>
   {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
        ) : null}
    <div className="flex items-center  gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {bookmarked ? (
              <button onClick={() => checkLogin(handleBookmark)}>
                <FaBookmark
                  className={`cursor-pointer text-fs_3xl text-action-color`}
                />
              </button>
            ) : (
              <button onClick={() => checkLogin(handleBookmark)}>
                <FaRegBookmark
                  className={`cursor-pointer text-fs_3xl hover:text-action-color  duration-200`}
                />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{bookmarked ? `Remove from Bookmarks` : `Add to Bookmarks`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
   </>
  );
})