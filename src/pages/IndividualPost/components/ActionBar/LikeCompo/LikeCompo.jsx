import { FaHeart } from "react-icons/fa6";
import { useLikePost } from "@/hooks/postLikes/useLikePost";
import { useDisLikePost } from "@/hooks/postLikes/useDisLikePost";
import { memo, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaRegHeart } from "react-icons/fa";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { debounce, formatNumber } from "@/utils/utils";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";

export const LikeCompo = memo(
  ({ likedByUser: initialLikedByUser, likes: initialLikes }) => {

    const [likeStatus, setLikeStatus] = useState({
      isLikedByUser: initialLikedByUser,
      likes: initialLikes,
    });

    const isMounted = useRef(true);

    const { likePost, isError: isLikePostError } = useLikePost();
    const { disLikePost, isError: isDisLikePostError} = useDisLikePost();
     const { auth } = useAuth();
    const { accessToken } = auth;
    const { checkLogin, showRequireLoginModal, hideLoginModal } =
      useRequireLogin({ accessToken });

    const likeMutationError = isLikePostError || isDisLikePostError;
    
    //Effect for state sync
    useEffect(() => {
      if (isMounted.current) {
        isMounted.current = false;
        return;
      }
      const timer = debouncedLikeDislikeMutation()
      return () => {
        clearTimeout(timer);
      };
    }, [likeStatus.isLikedByUser]);

    //Effect for error reset
    useEffect(() => {
       if (isMounted.current) {
        isMounted.current = false;
        return;
      }

      if (!likeMutationError) return;
       
      setLikeStatus((prev) => {
        return {
          isLikedByUser: initialLikedByUser,
          likes: parseInt(initialLikes),
        };
      });
    }, [likeMutationError]);

   

    const likeDislikeMutation = () => {
      
      if (likeStatus.isLikedByUser) {
        likePost();
      } else {
        disLikePost();
      }
    };
    const debouncedLikeDislikeMutation = debounce({
      cb:likeDislikeMutation,
      delay:300
    })

    const handleLikeDislike = () => {
        setLikeStatus((prev) => {
          const isLikedByUser = !prev.isLikedByUser;
          const likes = prev.isLikedByUser?parseInt(prev.likes) - 1:parseInt(prev.likes) +1;
          return {
            isLikedByUser,
            likes,
          };
        });
    
    };


    return (
      <>
        {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => hideLoginModal()} />
        ) : null}
        <div className="flex items-center md:flex-col">
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                {likeStatus.isLikedByUser ? (
                  <button
                    variant={`icon`}
                    onClick={() => checkLogin(handleLikeDislike)}
                    className=" py-2 px-2"
                    data-test={"like"}
                    data-is-liked={"true"}
                    data-total-likes={likeStatus.likes}
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
                    data-test={"like"}
                    data-is-liked={"false"}
                    data-total-likes={likeStatus.likes}
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
          <span className="text-fs_base">
            {formatNumber(parseInt(likeStatus.likes))}
          </span>
        </div>
      </>
    );
  },
);
