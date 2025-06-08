import React, { memo, useRef, useState } from "react";
import { useCreateComment } from "../../../../hooks/comments/useCreateComment";
import toast from "react-hot-toast";

import { LoadingTextWithSpinner } from "../../../common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useAuth } from "@/hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const CommentForm = memo(
  ({ parentId = null, isReplyForm = false, handleFormDissmiss }) => {
    const { isPending: isCreateCommentPending, createComment } =
      useCreateComment();
    const { auth } = useAuth();

    const currentUserId = auth.userId;
    const { postId } = useParams();

    const commentContentRef = useRef(null);

    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      const content = commentContentRef.current.value;
      if (!content) {
        toast.error(
          `Please add some content to ${isReplyForm ? `reply` : `comment`}.`
        );
        return;
      }
      const createdAt = new Date();

      const formdata = {
        content,
        userId: currentUserId,
        postId,
        createdAt,
        parentId,
      };

      createComment(formdata);
      commentContentRef.current.value = "";
    };

    if (isCreateCommentPending) {
      return (
        <LoadingTextWithSpinner>posting comment ...</LoadingTextWithSpinner>
      );
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <textarea
            autoFocus={isReplyForm ? true : false}
            name="comments_text_area"
            placeholder={isReplyForm ? `Post a reply` : `Post a comment`}
            id="comments_text_area"
            className="w-full flex h-28 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-color disabled:cursor-not-allowed disabled:opacity-50 md:text-sm "
            ref={commentContentRef}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleSubmit(e);
              }
            }}
          ></textarea>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="action"
              className="self-start  tracking-wide"
              disabled={isCreateCommentPending}
            >
              Submit
            </Button>

            {isReplyForm ? (
              <Button
                type="button"
                className="self-start"
                disabled={isCreateCommentPending}
                onClick={handleFormDissmiss}
              >
                Dismiss
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    );
  }
);
