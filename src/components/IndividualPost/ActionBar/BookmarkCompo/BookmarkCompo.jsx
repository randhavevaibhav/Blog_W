import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";

import { useCreateIndividualPostBookmark } from "@/hooks/bookmark/useCreateIndividualPostBookmark";

import { useRemoveIndividualPostBookmark } from "@/hooks/bookmark/useRemoveIndividualPostBookmark";
import React, { memo, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const BookmarkCompo =memo( ({ bookmarked }) => {
  const { auth } = useAuth();
  const { accessToken,userId:currentUserId } = auth;
  const {hideLoginModal,showRequireLoginModal,checkLogin} = useRequireLogin({accessToken})
  const {userId,postId} = useParams()
  const { createBookmark } = useCreateIndividualPostBookmark({currentUserId,userId,postId});
  const { removeBookmark } = useRemoveIndividualPostBookmark({currentUserId,userId,postId});
  
  

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark();
    } else {
      createBookmark();
    }
  };


// console.log("bookmark re-render")
  return (
   <>
   {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => hideLoginModal()} />
        ) : null}
    <div className="flex items-center  gap-2">
      <TooltipProvider >
        <Tooltip>
          <TooltipTrigger asChild>
            {bookmarked ? (
              <button onClick={() => checkLogin(handleBookmark)}  className="py-2 px-2" data-test={'bookmark'} data-selected={`true`}>
                <FaBookmark
                  className={`cursor-pointer  text-action-color`}
                  size={`24px`}
                />
              </button>
            ) : (
              <button onClick={() => checkLogin(handleBookmark)}  className="py-2 px-2" data-test={'bookmark'} data-selected={`false`}>
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