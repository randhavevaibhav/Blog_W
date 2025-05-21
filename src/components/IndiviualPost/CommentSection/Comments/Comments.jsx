import React from "react";
import { Comment } from "./Comment";
import { v4 as uuidv4 } from "uuid";

export const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <Comment
            key={uuidv4()}
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
