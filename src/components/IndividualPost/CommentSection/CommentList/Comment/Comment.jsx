import React, { forwardRef, memo } from "react";
import { useAuth } from "../../../../../hooks/auth/useAuth";
import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar.jsx";
import { Link, useParams } from "react-router-dom";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CommentReaction } from "../CommentReaction/CommentReaction";
import { Comments } from "../Comments/Comments";
import { getFormattedDateString } from "@/utils/utils";
import { CommentMenu } from "./CommentMenu/CommentMenu";

export const Comment = memo(
  forwardRef(
    (
      {
        commentId,
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
        isCmtUpdated
      },
      ref
    ) => {
      const { auth } = useAuth();
      const { userId: postUserId, postId } = useParams();
      const currentUserId = auth.userId;
      const hasReplies = replies.length > 0;
      const isGhostCmt = content === `NA-#GOHST`;
      const isCmtBelongsToUser = Number(currentUserId) === Number(userId);
      const formattedDateStr = getFormattedDateString({ createdAt });
      
      // console.log("re-render comment")

      
      return (
        <>
          <div className="grid grid-cols-[40px_auto] gap-2 "  id={`comment_${commentId}`} data-test={`comment-list-comment`}>
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
                            <Link to={ `/userprofile/${userId}`} className="mr-4 text-fs_base font-semibold capitalize text-text-fade">
                              {userName}
                            </Link>
                            <span className="text-fs_xs text-text-fade">
                              {formattedDateStr}
                            </span>
                          </div>
                        </div>

                        {isCmtBelongsToUser&&isCmtUpdated ? (
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
                          <p className="text-fs_base px-2" data-test={`comment-content`} id={`comment-content`}>{content}</p>
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

          {replies.length > 0 ? (
            <div className="ml-10">
              <Comments commentsData={replies} level={level + 1} />
            </div>
          ) : null}
        </>
      );
    }
  )
);
