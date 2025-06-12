import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CommentForm } from "../CommentForm/CommentForm";
import { useDisLikeComment } from "@/hooks/commentLikes/useDisLikeComment";
import { useLikeComment } from "@/hooks/commentLikes/useLikeComment";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { formatNumber } from "@/utils/utils";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";

export const CommentReaction = ({
  isGhostCmt,
  commentId,
  likes,
  isCmtLikedByUser,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isCmtLiked, setIsCmtLiked] = useState(isCmtLikedByUser);
  const [likeCount, setLikeCount] = useState(Number(likes));
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);
  const { auth } = useAuth();
  const { accessToken } = auth;
  const {
    disLikeComment,
    isError: isDislikeCmtError,
    isPending: isDislikeCmtPending,
  } = useDisLikeComment();
  const {
    likeComment,
    isError: isLikeCmtError,
    isPending: isLikeCmtPending,
  } = useLikeComment();
  const handleFormDissmiss = useCallback(() => setShowReplyForm(false));

  const handleCmtLike = () => {
    // console.log("like cmt")
    setIsCmtLiked(true);
    const createdAt = new Date();
    const cmtData = {
      commentId,
      createdAt,
    };
    likeComment(cmtData);
    setLikeCount((prev) => prev + 1);
  };

  const handleCmtDisLike = () => {
    // console.log("dis-like cmt")
    setIsCmtLiked(false);
    disLikeComment({ commentId });
    setLikeCount((prev) => prev - 1);
  };
  if (isDislikeCmtError || isLikeCmtError) {
    return <ErrorText>Error while reacting to comment !</ErrorText>;
  }

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return;
    }
  };

  return (
    <>
     {showRequireLoginModal ? (
            <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
          ) : null}
      {!showReplyForm && !isGhostCmt ? (
        <div className="flex comment_footer mt-2">
          <div className="likes flex items-center">
            {isCmtLiked ? (
              <Button
                onClick={() => checkLogin(handleCmtDisLike)}
                variant={`ghost`}
                size={`sm`}
                disabled={isLikeCmtPending}
                className={`px-2 pr-3`}
              >
                <FaHeart color="red" />
                <span className="text-fs_xs">
                  {likeCount}&nbsp;{`${likeCount > 1 ? `likes` : `like`}`}
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => checkLogin(handleCmtLike)}
                variant={`ghost`}
                size={`sm`}
                disabled={isDislikeCmtPending}
                className={`px-2 pr-3`}
              >
                <FaRegHeart />
                <span className="text-fs_xs">
                  {formatNumber(likeCount)}&nbsp;
                  {`${formatNumber(likeCount) > 1 ? `likes` : `like`}`}
                </span>
              </Button>
            )}
          </div>
          <Button
            onClick={() => checkLogin(() => setShowReplyForm(true))}
            variant={`ghost`}
            size={`sm`}
          >
            <FaRegComment
              className="cursor-pointer transform -scale-x-90"
              size={"20px"}
            />
            <span className="capitalize tracking-wider">Reply</span>
          </Button>
        </div>
      ) : null}
      {showReplyForm ? (
        <CommentForm
          isReplyForm={true}
          handleFormDissmiss={handleFormDissmiss}
          parentId={commentId}
        />
      ) : null}
    </>
  );
};
