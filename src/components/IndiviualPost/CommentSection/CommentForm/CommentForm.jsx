import React, { useRef } from "react";
import { useCreateComment } from "../../../../hooks/comments/useCreateComment";
import toast from "react-hot-toast";
import { Button } from "../../../common/Button/Button";
import { LoadingTextWithSpinner } from "../../../common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { useAuth } from "@/hooks/auth/useAuth";
import { useParams } from "react-router-dom";
export const CommentForm = () => {
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
    };

    if (!content) {
      toast.error(`Please add some content to comment.`);
      return;
    }

    createComment(formdata);
    commentContentRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <textarea
          name="comments_text_area"
          placeholder="post a comment"
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

        <Button
          varient="primary"
          className="self-start"
          disabled={isCreateCommentPending}
        >
          Submit
        </Button>
        {isCreateCommentPending ? (
          <LoadingTextWithSpinner>posting comment ...</LoadingTextWithSpinner>
        ) : null}
      </div>
    </form>
  );
};
