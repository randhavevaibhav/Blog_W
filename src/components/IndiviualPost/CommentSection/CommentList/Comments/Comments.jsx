import React from 'react'
import { Comment } from '../Comment/Comment';
import { v4 as uuidv4 } from "uuid";
export const Comments = ({commentsData}) => {

      return commentsData.map((comment) => {
          return (
            <Comment
              key={uuidv4()}
              commentId={comment.commentId}
              userName={comment.userName}
              date={comment.createdAt}
              content={comment.content}
              userId={comment.userId}
              userProfileImg={comment.userProfileImg}
              replies={comment.replies}
              parentId={comment.parentId}
              likes={comment.likes}
              isCmtLikedByUser={comment.isCmtLikedByUser}
             
            
            />
          );
        })

}

