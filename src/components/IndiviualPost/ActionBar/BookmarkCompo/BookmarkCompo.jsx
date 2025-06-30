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
import { useParams } from "react-router-dom";

export const BookmarkCompo =memo( ({ bookmarked }) => {
  const { auth } = useAuth();
  const { accessToken,userId:currentUserId } = auth;
  const {userId,postId} = useParams()
  const { createBookmark } = useCreateBookmark({currentUserId,userId,postId,mutationLocation:"indiPostPage"});
  const { removeBookmark } = useRemoveBookmark({currentUserId,userId,postId,mutationLocation:"indiPostPage"});
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);
  

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
      <TooltipProvider >
        <Tooltip>
          <TooltipTrigger asChild>
            {bookmarked ? (
              <button onClick={() => checkLogin(handleBookmark)}  className="py-2 px-2">
                <FaBookmark
                  className={`cursor-pointer  text-action-color`}
                  size={`24px`}
                />
              </button>
            ) : (
              <button onClick={() => checkLogin(handleBookmark)}  className="py-2 px-2">
                <FaRegBookmark
                  className={`cursor-pointer  hover:text-action-color  duration-200`}
                  size={`24px`}
                />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent side={`bottom`}  className="md:block hidden text-wrap max-w-[5rem]">
            <p>{bookmarked ? `Remove from Bookmarks` : `Add to Bookmarks`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
   </>
  );
})