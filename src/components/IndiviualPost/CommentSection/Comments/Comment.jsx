import React from "react";
import { CommentMenu } from "./CommentMenu.jsx";
import { useDeleteComment } from "../../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { format } from "date-fns";

export const Comment = ({ commentId, userName, date, content, userId }) => {
  const { isPending: isDeleteCmtPending, deleteComment } = useDeleteComment();

  const { auth } = useAuth();
  const currentUserId = auth.userId;
  const isCmtBelongsToUser = currentUserId === userId;

  const handleDeleteCmt = () => {
    deleteComment({
      userId: currentUserId,
      commentId,
    });
  };
  return (
    <div className="flex flex-col gap-4 indiviual_comment w-full border dark:border-gray-50 dark:border-opacity-50 rounded-md pt-2 pb-4 px-2">
      <header className="flex justify-between items-center relative">
        <div className="content">
          <a href="" className="mr-4 font-bold text-lg">
            {userName}
          </a>
          <span className="text-sm">
            {" "}
            Published: {format(new Date(date), "yyyy-MM-dd")}
          </span>
        </div>
        {isCmtBelongsToUser ? (
          <CommentMenu
            handleDeleteCmt={handleDeleteCmt}
            isDeleteCmtPending={isDeleteCmtPending}
          />
        ) : null}
      </header>
      <div className="comment_body">{content}</div>
    </div>
  );
};
