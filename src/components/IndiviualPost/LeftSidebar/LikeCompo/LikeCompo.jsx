import { FaRegHeart } from "react-icons/fa";
import heartSVG from "../../../../assets/heart.svg";
import { useLikePost } from "../../../../hooks/likes/useLikePost";
import { useDisLikePost } from "../../../../hooks/likes/useDisLikePost";
import { memo, useState } from "react";
export const LikeCompo = memo(({ likedByUser, likes }) => {
  const [isLikedByUser, setIsLikedByUser] = useState(likedByUser || false);
  const [totalLikes, setTotalLikes] = useState(likes);
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();

  const handleLikeDislike = () => {
    const createdAt = new Date();

    if (isLikedByUser) {
      setIsLikedByUser(false);
      setTotalLikes((prev) => prev - 1);
      disLikePost({
        createdAt,
        likesCount: totalLikes,
        likeAction: false,
      });
    } else {
      setIsLikedByUser(true);
      setTotalLikes((prev) => prev + 1);
      likePost({
        createdAt,
        likesCount: totalLikes,
        likeAction: true,
      });
    }
  };
  // console.log("LikeCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center  gap-2">
        {isLikedByUser ? (
          <button onClick={handleLikeDislike}>
            <img
              src={heartSVG}
              alt="heart svg"
              className="md:w-[30px] w-[24px] cursor-pointer"
            />
          </button>
        ) : (
          <button onClick={handleLikeDislike}>
            <FaRegHeart className={`cursor-pointer text-fs_3xl`} />
          </button>
        )}
        <span className="text-fs_base">{totalLikes}</span>
      </div>
    </>
  );
});
