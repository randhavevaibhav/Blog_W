import React, { useState } from "react";
import { Comment } from "./Comment";

export const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            userName={comment.userName}
            date={comment.created_at}
            content={comment.content}
            userId={comment.userId}
            userProfileImg={comment.userProfileImg}
          />
        );
      })}
    </>
  );
};
