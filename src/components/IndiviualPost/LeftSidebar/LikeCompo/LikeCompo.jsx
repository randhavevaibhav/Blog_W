import { FaRegHeart } from "react-icons/fa";
import heartSVG from "../../../../assets/heart.svg";
import { useLikePost } from "../../../../hooks/likes/useLikePost";
import { useDisLikePost } from "../../../../hooks/likes/useDisLikePost";
import { memo } from "react";
export const LikeCompo = memo(({ likedByUser, likes }) => {
  
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();

  const handleLikeDislike = () => {
    const createdAt = new Date();

    if (likedByUser) {
     
      disLikePost({createdAt});
    } else {
     
      likePost({createdAt});
    }
  };
  // console.log("LikeCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center  gap-2">
        {likedByUser ? (
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
        <span className="text-fs_base">{likes}</span>
      </div>
    </>
  );
});
