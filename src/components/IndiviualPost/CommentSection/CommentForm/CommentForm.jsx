import React, { useRef } from "react";
import { useCreateComment } from "../../../../hooks/comments/useCreateComment";
import toast from "react-hot-toast";

import { LoadingTextWithSpinner } from "../../../common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useAuth } from "@/hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const CommentForm = ({
  parentId = null,
  isReplyForm = false,
  handleFormDissmiss = () => {},
}) => {
  // console.log("parentId ===> ",parentId)
  const { isPending: isCreateCommentPending, createComment } =
    useCreateComment();
  const { auth } = useAuth();

  const currentUserId = auth.userId;
  const { postId } = useParams();

  const commentContentRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = commentContentRef.current.value;
    const createdAt = new Date();

    const formdata = {
      content,
      userId: currentUserId,
      postId,
      createdAt,
      parentId,
    };

    if (!content) {
      toast.error(`Please add some content to comment.`);
      return;
    }

    createComment(formdata);
    commentContentRef.current.value = "";
  };

  if (isCreateCommentPending) {
    return <LoadingTextWithSpinner>posting comment ...</LoadingTextWithSpinner>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <textarea
          name="comments_text_area"
          placeholder={isReplyForm?`Post a reply`:`post a comment`}
          id="comments_text_area"
          className="w-full text-text-primary bg-bg-primary border dark:border-gray-50  dark:border-opacity-50 outline-blue-500 p-3
                  rounded-md"
          ref={commentContentRef}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              handleSubmit(e);
            }
          }}
        ></textarea>

        <div className="flex gap-4">
          <Button
            
            variant="action"
            className="self-start  tracking-wide"
            disabled={isCreateCommentPending}
          >
            Submit
          </Button>

          {isReplyForm ? (
            <Button
             
              
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
};
