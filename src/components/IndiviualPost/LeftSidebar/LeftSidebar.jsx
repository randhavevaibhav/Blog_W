

import { LikeCompo } from "./LikeCompo/LikeCompo";

import { CommentsCompo } from "./CommentsCompo/CommentsCompo";
import { memo } from "react";
import { BookmarkCompo } from "./BookmarkCompo/BookmarkCompo";

export const LeftSidebar = memo(
  ({ totalLikes = 0, totalComments = 0, isLikedByUser = false,bookmarked=false }) => {
    // console.log("LeftSidebar re-render !")
    return (
      <>
        <aside>
          <div
            className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly py-1`}
          >
            <LikeCompo likes={totalLikes} likedByUser={isLikedByUser} />

            <CommentsCompo commentsCount={totalComments} />
            <BookmarkCompo bookmarked={bookmarked}/>
          </div>
        </aside>
      </>
    );
  }
);
