import { FaRegHeart } from "react-icons/fa";
import heartSVG from "../../../../assets/heart.svg";
import { useLikePost } from "../../../../hooks/likes/useLikePost";
import { useDisLikePost } from "../../../../hooks/likes/useDisLikePost";
import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export const LikeCompo = memo(({ likedByUser, likes }) => {
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();

  const handleLikeDislike = () => {
    const createdAt = new Date();

    if (likedByUser) {
      disLikePost({ createdAt });
    } else {
      likePost({ createdAt });
    }
  };
  // console.log("LikeCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center md:flex-col md:gap-1 gap-2">
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-fs_base">{likes}</span>
      </div>
    </>
  );
});
