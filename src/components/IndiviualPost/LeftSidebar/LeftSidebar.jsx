import { FaRegHeart } from "react-icons/fa";
import { useLikePost } from "../../../hooks/likes/useLikePost";

import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import heartSVG from "../../../assets/heart.svg";
import { useState } from "react";
export const LeftSidebar = ({ commentsCount, likesCount, likedByUser }) => {
  const { likePost, isPending } = useLikePost();
 

  const handleLike = () => {
    const createdAt = format(new Date(), "yyyy-MM-dd");
    const optimisticLikesCount = !likedByUser?Number(likesCount)+1:Number(likesCount)-1;
   
    likePost({ createdAt, likesCount:optimisticLikesCount,likeAction:!likedByUser });
  };

  return (
    <aside>
      <div
        className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
      >
        <div className="flex items-center  gap-2">
          {likedByUser ? (
            <img
              src={heartSVG}
              alt="heart svg"
              className="w-[30px] cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <FaRegHeart
              size={"1.9rem"}
              className={`cursor-pointer`}
              onClick={handleLike}
            />
          )}
          <span>{likesCount}</span>
        </div>

        <div className="flex items-center gap-2">
          <AiOutlineMessage size={"1.9rem"} className={`cursor-pointer`} />
          <span>{commentsCount}</span>
        </div>
      </div>
    </aside>
  );
};
