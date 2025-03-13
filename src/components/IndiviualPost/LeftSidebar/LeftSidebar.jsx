import { FaRegHeart } from "react-icons/fa";

import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import heartSVG from "../../../assets/heart.svg";
import { MdDangerous } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import { useDisLikePost } from "../../../hooks/likes/useDisLikePost";
import { useLikePost } from "../../../hooks/likes/useLikePost";
import { useState } from "react";

export const LeftSidebar = ({ commentsCount, likesCount, likedByUser }) => {
  // const { likePost, isPending: isCreateLikePending } = useCreateLikePost();
  const [isLikedByUser,setIsLikedByUser] = useState(likedByUser);
  const [totalLikes,setTotalLikes] = useState(likesCount);
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();

  const handleLike = () => {
    const createdAt = format(new Date(), "yyyy-MM-dd");
    

  if(isLikedByUser)
  {
    setIsLikedByUser(false);
    setTotalLikes(prev=>prev-1);
    disLikePost({
        createdAt,
        likesCount: totalLikes,
        likeAction: false,
      });
  }else{
    setIsLikedByUser(true)
    setTotalLikes(prev=>prev+1);
         likePost({
        createdAt,
        likesCount: totalLikes,
        likeAction: true,
      });
  }
      

    

  };

  return (
    <>
      <aside>
        <div
          className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
        >
          <div className="flex items-center  gap-2">
            {isLikedByUser ? (
              <button onClick={handleLike} id="likeBtn">
                <img
                  src={heartSVG}
                  alt="heart svg"
                  className="w-[30px] cursor-pointer"
                />
              </button>
            ) : (
              <button onClick={handleLike} id="likeBtn">
                <FaRegHeart size={"1.9rem"} className={`cursor-pointer`} />
              </button>
            )}
            <span>{totalLikes}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                document
                  .getElementById("comments")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <AiOutlineMessage size={"1.9rem"} className={`cursor-pointer`} />
            </button>
            <span>{commentsCount}</span>
          </div>
        </div>
      </aside>
      <Toaster
        toastOptions={{ icon: <MdDangerous size={"40px"} color="red" /> }}
      />
    </>
  );
};
