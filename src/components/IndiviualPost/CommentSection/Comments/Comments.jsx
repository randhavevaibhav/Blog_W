import React from "react";
import { Comment } from "./Comment";
import { v4 as uuidv4 } from "uuid";
import { formatNumber } from "@/utils/utils";

export const Comments = ({ comments }) => {
  return (
    <>
      <div className="flex flex-col gap-4">
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
              replies={comment.replies}
              parentId={comment.parentId}
              likes={comment.likes}
              isCmtLikedByUser={comment.isCmtLikedByUser}
            />
          );
        })}
      </div>
    </>
  );
};
