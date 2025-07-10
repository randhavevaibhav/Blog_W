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
import { formatNumber } from "@/utils/utils";

export const LikeCompo = memo(({ likedByUser, likes }) => {
  const { likePost } = useLikePost();
  const { disLikePost } = useDisLikePost();
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);

  const { auth } = useAuth();
  const { accessToken } = auth;

  const handleLikeDislike = () => {
    if (likedByUser) {
      if (likes <= 0) {
        return;
      }
      disLikePost();
    } else {
      likePost();
    }
  };

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return;
    }
  };

  // console.log("like compo re-render")
  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
      ) : null}
      <div className="flex items-center md:flex-col">
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              {likedByUser ? (
                <button
                  variant={`icon`}
                  onClick={() => checkLogin(handleLikeDislike)}
                  className=" py-2 px-2"
                >
                  <FaHeart
                    className={`cursor-pointer`}
                    size={`24px`}
                    color="red"
                  />
                </button>
              ) : (
                <button
                  onClick={() => checkLogin(handleLikeDislike)}
                  className=" py-2 px-2"
                >
                  <FaRegHeart
                    className={`cursor-pointer  hover:text-red-500 duration-200`}
                    size={`24px`}
                  />
                </button>
              )}
            </TooltipTrigger>
            <TooltipContent side={`bottom`} className="md:block hidden">
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-fs_base">{formatNumber(parseInt(likes))}</span>
      </div>
    </>
  );
});
