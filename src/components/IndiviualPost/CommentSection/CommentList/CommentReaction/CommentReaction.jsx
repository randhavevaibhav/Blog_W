import { Button } from "@/components/ui/button";
import React, { memo, useCallback, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CommentForm } from "../../CommentForm/CommentForm";
import { useDisLikeComment } from "@/hooks/commentLikes/useDisLikeComment";
import { useLikeComment } from "@/hooks/commentLikes/useLikeComment";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { formatNumber } from "@/utils/utils";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import toast from "react-hot-toast";

export const CommentReaction = memo(({
  isGhostCmt,
  commentId,
  likes,
  isCmtLikedByUser,
  level
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
    error:dislikeError
  } = useDisLikeComment({commentId});
  const {
    likeComment,
    isError: isLikeCmtError,
    isPending: isLikeCmtPending,
    error:likeError
  } = useLikeComment({commentId});
  const handleFormDissmiss = useCallback(()=>setShowReplyForm(false),[]);

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
    setLikeCount((prev) => {
      if(prev<=0)
      {
        return 0;
      }else{
        return prev-1;
      }
    });
  };
  if (isDislikeCmtError || isLikeCmtError) {
    console.log("dislikeError ,likeError ==> ",dislikeError,likeError)
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
        <div className="flex comment_footer">
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
                  {formatNumber(Number(likeCount))}&nbsp;
                  {`${formatNumber(Number(likeCount)) > 1 ? `likes` : `like`}`}
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
                  {formatNumber(Number(likeCount))}&nbsp;
                  {`${formatNumber(Number(likeCount)) > 1 ? `likes` : `like`}`}
                </span>
              </Button>
            )}
          </div>
          <Button
            onClick={() => checkLogin(() => {
              setShowReplyForm(true)
          
            })}
            variant={`ghost`}
            size={`sm`}
            className={`${level>=4?`cursor-not-allowed`:``}`}
            disabled={level>=4?true:false}
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
          key={commentId}
        />
      ) : null}
    </>
  );
})