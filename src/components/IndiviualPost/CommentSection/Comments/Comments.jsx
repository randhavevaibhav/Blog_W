import React from "react";
import { Comment } from "./Comment";

export const Comments = ({ data }) => {
  return (
    <>
      {JSON.parse(data).map((comment) => {
        return (
          <Comment
            key={comment.id}
            commentId={comment.id}
            userName={comment.userName}
            date={comment.created_at}
            content={comment.content}
            userId={comment.userId}
          />
      
        );
      })}
    </>
  );
};
