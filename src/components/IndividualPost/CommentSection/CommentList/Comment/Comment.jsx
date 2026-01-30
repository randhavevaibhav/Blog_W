import React, { forwardRef, memo } from "react";
import { useAuth } from "../../../../../hooks/auth/useAuth";
import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar.jsx";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CommentReaction } from "../CommentReaction/CommentReaction";
import { getFormattedDateString } from "@/utils/utils";
import { CommentMenu } from "./CommentMenu/CommentMenu";

export const Comment = memo(
  forwardRef(
    (
      {
        commentId,
        commentsData,
        parentId,
        userName,
        createdAt,
        content,
        userId,
        userProfileImg,
        replies,
        likes,
        isCmtLikedByUser,
        level,
        page,
        isCmtUpdated,
      },
      ref,
    ) => {
      const { auth } = useAuth();
      const { userId: postUserId, postId } = useParams();
      const currentUserId = auth.userId;
      const hasReplies = replies?.length > 0;
      const isGhostCmt = content === `NA-#GOHST`;
      const isCmtBelongsToUser = Number(currentUserId) === Number(userId);
      const formattedDateStr = getFormattedDateString({ createdAt });

     
      // console.log("re-render comment")
       
      // console.log("isCmtUpdated ==> ",isCmtUpdated)
      // console.log("isCmtBelongsToUser ==> ",isCmtBelongsToUser)
      return (
        <>
          <div
            className="grid grid-cols-[40px_auto] gap-2 "
            id={`comment_${commentId}`}
            data-test={`comment-list-comment`}
            data-parent-id={`comment_${parentId ? parentId : 0}`}
          >
            <Link
              to={isGhostCmt ? `` : `/userprofile/${userId}`}
              className={`${isGhostCmt ? `mt-0` : `mt-2`} size-0`}
            >
              <UserAvatar
                userProfileImg={isGhostCmt ? null : userProfileImg}
                avatarSize="small"
              />
            </Link>
            <div>
              <Card
                className={`${
                  isGhostCmt ? `mb-4` : `mb-1`
                } bg-card-bg border-card-border shadow-none`}
              >
                {isGhostCmt ? (
                  <CardContent className="md:p-4 p-2">
                    <div className="flex text-center justify-center text-text-fade">
                      Comment deleted !
                    </div>
                  </CardContent>
                ) : (
                  <>
                    <CardHeader className="px-2 py-2">
                      <header className="flex justify-between items-center ">
                        <div className="content flex items-center">
                          <div className="">
                            <Link
                              to={`/userprofile/${userId}`}
                              className="mr-4 text-fs_base font-semibold capitalize text-text-fade"
                            >
                              {userName}
                            </Link>
                            <span className="text-fs_xs text-text-fade">
                              {formattedDateStr}
                            </span>
                          </div>
                        </div>

                        {isCmtBelongsToUser && isCmtUpdated ? (
                          <CommentMenu
                            commentId={commentId}
                            postId={postId}
                            postUserId={postUserId}
                            hasReplies={hasReplies}
                            content={content}
                          />
                        ) : null}
                      </header>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex flex-col gap-4 w-full">
                        <div className="comment_body">
                          <p
                            className="text-fs_base px-2"
                            data-test={`comment-content`}
                            id={`comment-content`}
                          >
                            {content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>

              <CommentReaction
                commentId={commentId}
                isGhostCmt={isGhostCmt}
                likes={likes}
                isCmtLikedByUser={isCmtLikedByUser}
                level={level}
                page={page}
                isCmtUpdated={isCmtUpdated}
              />
            </div>
          </div>

          <CommentReplies replies={replies} commentsData={commentsData} />
        </>
      );
    },
  ),
);

const CommentReplies = ({ replies, commentsData }) => {
  if (!replies || replies.length <= 0) {
    return null;
  }
  return replies.map((replyId) => {
    const reply = commentsData[replyId];
    if (!reply) {
      return null;
    }
    return (
      <div className="ml-6" key={uuidv4()}>
        <Comment
          commentId={reply.commentId}
          userName={reply.userName}
          createdAt={reply.createdAt}
          content={reply.content}
          userId={reply.userId}
          userProfileImg={reply.userProfileImg}
          replies={reply?.replies}
          parentId={reply.parentId}
          likes={reply.likes}
          isCmtLikedByUser={reply.isCmtLikedByUser}
          level={reply.depth}
          page={reply.page}
          isCmtUpdated={reply.isCmtUpdated}
          commentsData={commentsData}
        />
      </div>
    );
  });
};
