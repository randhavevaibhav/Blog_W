import { FaHeart } from "react-icons/fa6";
import { useLikePost } from "../../../../hooks/postLikes/useLikePost";
import { useDisLikePost } from "../../../../hooks/postLikes/useDisLikePost";
import { memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegHeart } from "react-icons/fa";
export const LikeCompo = memo(({ likedByUser, likes }) => {
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();

  const handleLikeDislike = () => {
    const createdAt = new Date();

    if (likedByUser) {
      disLikePost();
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
                  <FaHeart
                    className={`cursor-pointer text-fs_3xl`}
                    color="red"
                  />
                </button>
              ) : (
                <button onClick={handleLikeDislike}>
                  <FaRegHeart
                    className={`cursor-pointer text-fs_3xl hover:text-red-500 duration-200`}
                  />
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
