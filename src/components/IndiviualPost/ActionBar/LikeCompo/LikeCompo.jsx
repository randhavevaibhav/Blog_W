import { FaHeart } from "react-icons/fa6";
import { useLikePost } from "../../../../hooks/postLikes/useLikePost";
import { useDisLikePost } from "../../../../hooks/postLikes/useDisLikePost";
import { memo, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
export const LikeCompo = memo(({ likedByUser, likes }) => {
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);

  const { auth } = useAuth();
  const { accessToken } = auth;

  const handleLikeDislike = () => {
    const createdAt = new Date();

    if (likedByUser) {
      disLikePost();
    } else {
      likePost({ createdAt });
    }
  };

  const checkLogin = (cb=()=>{}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return
    }
  };

// console.log("like compo re-render")
  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
      ) : null}
      <div className="flex items-center md:flex-col md:gap-1 gap-2">
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              {likedByUser ? (
                <button onClick={() => checkLogin(handleLikeDislike)}>
                  <FaHeart
                    className={`cursor-pointer md:text-[25px] text-[22px]`}
                    color="red"
                  />
                </button>
              ) : (
                <button onClick={() => checkLogin(handleLikeDislike)}>
                  <FaRegHeart
                    className={`cursor-pointer md:text-[25px] text-[22px] hover:text-red-500 duration-200`}
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
