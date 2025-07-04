import { LikeCompo } from "./LikeCompo/LikeCompo";

import { CommentsCompo } from "./CommentsCompo/CommentsCompo";
import { memo } from "react";
import { BookmarkCompo } from "./BookmarkCompo/BookmarkCompo";
import { ShareMenuCompo } from "./ShareMenuCompo/ShareMenuCompo";

export const ActionBar = memo(
  ({
    totalLikes = 0,
    totalComments = 0,
    isLikedByUser = false,
    bookmarked = false,
  }) => {
    // console.log("LeftSidebar re-render !")
    return (
      <>
        <aside>
          <div
            className={`flex md:flex-col md:justify-normal fixed gap-2 items-center md:top-[10rem] bottom-0 md:w-fit w-full justify-evenly md:py-1 py-2 z-20 md:shadow-none shadow md:border-none border bg-bg-primary`}
          >
            <LikeCompo likes={totalLikes} likedByUser={isLikedByUser} />

            <CommentsCompo commentsCount={totalComments} />
            <BookmarkCompo bookmarked={bookmarked} />
            <ShareMenuCompo />
          </div>
        </aside>
      </>
    );
  }
);
