import { FaRegHeart } from "react-icons/fa";
import { useCreateLikePost } from "../../../hooks/likes/useCreateLikePost";

import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import heartSVG from "../../../assets/heart.svg";
import { MdDangerous } from "react-icons/md";
import { Toaster } from "react-hot-toast";

export const LeftSidebar = ({ commentsCount, likesCount, likedByUser }) => {
  const { likePost, isPending: isCreateLikePending } = useCreateLikePost();


  const handleLike = () => {
    const createdAt = format(new Date(), "yyyy-MM-dd");

    const optimisticLikesCount = !likedByUser
      ? Number(likesCount) + 1
      : Number(likesCount) - 1;

    likePost({
      createdAt,
      likesCount: optimisticLikesCount,
      likeAction: !likedByUser,
    });
  };

  return (
    <>
      <aside>
        <div
          className={`flex md:flex-col md:justify-normal fixed gap-10 md:top-[10rem] bottom-0 md:backdrop-blur-none backdrop-blur-md md:w-fit w-full justify-evenly`}
        >
          <div className="flex items-center  gap-2">
            {likedByUser ? (
              <button
                onClick={handleLike}
                disabled={isCreateLikePending}
                id="likeBtn"
              >
                <img
                  src={heartSVG}
                  alt="heart svg"
                  className="w-[30px] cursor-pointer"
                />
              </button>
            ) : (
              <button
                onClick={handleLike}
                disabled={isCreateLikePending}
                id="likeBtn"
              >
                <FaRegHeart size={"1.9rem"} className={`cursor-pointer`} />
              </button>
            )}
            <span>{likesCount}</span>
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
      <Toaster toastOptions={{icon:<MdDangerous size={'40px'} color="red"/> }}/>
    </>
  );
};
