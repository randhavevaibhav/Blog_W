import { Button } from "@/components/ui/button";
import React, { memo, useCallback, useState } from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { CommentForm } from "../CommentForm/CommentForm";

export const CommentReaction = ({ isGhostCmt, commentId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isCmtLiked, setIsCmtLiked] = useState(false);
  const handleFormDissmiss = useCallback(()=>setShowReplyForm(false))

  const handleCmtLike = () => {
    // console.log("like cmt")
    setIsCmtLiked(true);
  };

  const handleCmtDisLike = () => {
    // console.log("dis-like cmt")
    setIsCmtLiked(false);
  };

  
  return (
    <>
      {!showReplyForm && !isGhostCmt ? (
        <div className="flex comment_footer mt-2">
          {isCmtLiked ? (
            <Button onClick={handleCmtDisLike} variant={`ghost`} size={`sm`}>
              <FaHeart color="red" />
            </Button>
          ) : (
            <Button onClick={handleCmtLike} variant={`ghost`} size={`sm`}>
              <FaRegHeart />
            </Button>
          )}
          <Button
            onClick={() => setShowReplyForm(true)}
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
}