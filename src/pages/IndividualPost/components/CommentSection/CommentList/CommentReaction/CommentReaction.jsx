import { Button } from "@/components/ui/button";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CommentForm } from "../../CommentForm/CommentForm";
import { useDisLikeComment } from "@/hooks/commentLikes/useDisLikeComment";
import { useLikeComment } from "@/hooks/commentLikes/useLikeComment";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { formatNumber } from "@/utils/utils";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import toast from "react-hot-toast";

export const CommentReaction = memo(
  ({
    isGhostCmt,
    commentId,
    likes,
    isCmtLikedByUser,
    level,
    page,
    isCmtUpdated,
  }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isCmtLiked, setIsCmtLiked] = useState(
      isCmtLikedByUser === "true" ? true : false,
    );
    const [likeCount, setLikeCount] = useState(parseInt(likes));
    const maxCmtLevelReached = level >= 4;

    const { auth } = useAuth();
    const { accessToken } = auth;
    const { checkLogin, showRequireLoginModal, hideLoginModal } =
      useRequireLogin({ accessToken });
    const {
      disLikeComment,
      isError: isDislikeCmtError,
      isPending: isDislikeCmtPending,
      error: dislikeError,
    } = useDisLikeComment({ commentId });
    const {
      likeComment,
      isError: isLikeCmtError,
      isPending: isLikeCmtPending,
      error: likeError,
    } = useLikeComment({ commentId });
    const handleFormDismiss = useCallback(() => setShowReplyForm(false), []);

    useEffect(() => {
      const revertLikeCmtChanges = () => {
        if (isCmtLiked) {
          setIsCmtLiked(false);
          setLikeCount((prev) => prev - 1);
        } else {
          setIsCmtLiked(true);
          setLikeCount((prev) => prev + 1);
        }
      };

      if(isDislikeCmtError || isLikeCmtError)
      {
        revertLikeCmtChanges()
      }

    }, [isDislikeCmtError,isLikeCmtError]);

    const handleCmtLike = () => {
      // console.log("like cmt")
      setIsCmtLiked(true);

      likeComment({
        page,
        commentId,
      });
      setLikeCount((prev) => prev + 1);
    };

    const handleCmtDisLike = () => {
      // console.log("dis-like cmt")
      setIsCmtLiked(false);
      disLikeComment({ commentId, page });
      setLikeCount((prev) => {
        if (prev <= 0) {
          return 0;
        } else {
          return prev - 1;
        }
      });
    };

    if (isDislikeCmtError || isLikeCmtError) {
      console.log("dislikeError ,likeError ==> ", dislikeError, likeError);
      toast.dismiss();
      toast.error("Error while reacting to comment !");
    }

    return (
      <>
        {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => hideLoginModal()} />
        ) : null}
        {!showReplyForm && !isGhostCmt ? (
          <div className="flex" data-test={`comment-footer`}>
            {isCmtLiked ? (
              <Button
                onClick={() => checkLogin(handleCmtDisLike)}
                variant={`ghost`}
                size={`sm`}
                disabled={isLikeCmtPending || isCmtUpdated ? false : true}
                className={`px-2 pr-3`}
                data-test={"like-comment-btn"}
                data-is-liked={"true"}
                data-total-likes={likeCount}
              >
                <FaHeart color="red" />
                <span className="text-fs_xs">
                  {formatNumber(Number(likeCount))}&nbsp;
                  {`${formatNumber(Number(likeCount)) > 1 ? `likes` : `like`}`}
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => checkLogin(handleCmtLike)}
                variant={`ghost`}
                size={`sm`}
                disabled={isDislikeCmtPending || isCmtUpdated ? false : true}
                className={`px-2 pr-3`}
                data-test={"like-comment-btn"}
                data-is-liked={"false"}
                data-total-likes={likeCount}
              >
                <FaRegHeart />
                <span className="text-fs_xs">
                  {formatNumber(parseInt(likeCount))}&nbsp;
                  {`${
                    formatNumber(parseInt(likeCount)) > 1 ? `likes` : `like`
                  }`}
                </span>
              </Button>
            )}

            <Button
              onClick={() =>
                checkLogin(() => {
                  setShowReplyForm(true);
                })
              }
              variant={`ghost`}
              size={`sm`}
              className={`${maxCmtLevelReached ? `cursor-not-allowed` : ``}`}
              disabled={
                (maxCmtLevelReached ? true : false) ||
                (isCmtUpdated ? false : true)
              }
              data-test={`reply-comment-btn`}
            >
              <FaRegComment
                className="cursor-pointer transform -scale-x-90"
                size={"20px"}
              />
              <span className="capitalize tracking-wider ">{`Reply`}</span>
            </Button>
          </div>
        ) : null}
        {showReplyForm ? (
          <CommentForm
            isReplyForm={true}
            handleFormDismiss={handleFormDismiss}
            parentId={commentId}
            key={commentId}
            page={page}
          />
        ) : null}
      </>
    );
  },
);
