import { MdDangerous } from "react-icons/md";
import { Toaster } from "react-hot-toast";

import { LikeCompo } from "./LikeCompo/LikeCompo";

import { CommentsCompo } from "./CommentsCompo/CommentsCompo";
import { memo } from "react";

export const LeftSidebar = memo(
  ({ totalLikes = 0, totalComments = 0, isLikedByUser = false }) => {
    // console.log("LeftSidebar re-render !")
    return (
      <>
        <aside>
          <div
            className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
          >
            <LikeCompo likes={totalLikes} likedByUser={isLikedByUser} />

            <CommentsCompo commentsCount={totalComments} />
          </div>
        </aside>
      </>
    );
  }
);
