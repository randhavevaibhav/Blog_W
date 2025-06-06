import React, { memo, useCallback, useMemo, useState } from "react";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar.jsx";
import { Link, useParams } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Comments } from "./Comments";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { CommentReaction } from "./CommentReaction";

export const Comment = memo(({
  commentId,
  parentId,
  userName,
  date,
  content,
  userId,
  userProfileImg,
  replies,
}) => {
  const { auth } = useAuth();

 
  const { userId: postUserId, postId } = useParams();



  const currentUserId = auth.userId;
  const hasReplies = replies.length > 0;
  const isGhostCmt = content === `NA-#GOHST`;
  const isCmtBelongsToUser = currentUserId === userId;
  const publishDate = new Date(date);
  const publishMonth = format(publishDate, "MMM", { locale: enUS });
  const publishYear = publishDate
    .getFullYear()
    .toString()
    .split("")
    .slice(2)
    .join("");

 

  console.log("re-render comment")
  return (
    <>
      <div className="grid grid-cols-[40px_auto]">
        <Link to={isGhostCmt?``:`/userprofile/${userId}`} className="mt-2">
          <UserAvatar
            userProfileImg={isGhostCmt ? null : userProfileImg}
            avatarSize="small"
          />
        </Link>
        <div>
          <Card className={`mb-4`}>
            {isGhostCmt ? (
              <CardContent className="p-4">
                <div className="flex text-center justify-center text-gray-400">
                  Comment deleted !
                </div>
              </CardContent>
            ) : (
              <>
                <CardHeader className="px-2 py-4">
                  <header className="flex justify-between items-center relative">
                    <div className="content flex items-center">
                      <div className="">
                        <span className="mr-4 text-fs_base font-bold capitalize text-primary">
                          {userName}
                        </span>
                        <span className="text-fs_xs text-gray-400">
                          {publishMonth}&nbsp;&nbsp;{publishYear}
                        </span>
                      </div>
                    </div>

                    {isCmtBelongsToUser ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:border-none focus:outline-none">
                          <HiDotsHorizontal className={`cursor-pointer`} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          className="flex flex-col gap-3 md:mb-0 mb-4"
                          sideOffset={20}
                        >
                          <DropdownMenuItem>
                            <Link
                              className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md w-full text-center"
                              to={`/comment/delete/${postId}/${postUserId}/${commentId}/${
                                parentId ? parentId : 0
                              }/${Number(hasReplies)}`}
                            >
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : null}
                  </header>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="flex flex-col gap-4 indiviual_comment w-full">
                    <div className="comment_body">
                      <p className="text-fs_base px-2">{content}</p>
                    </div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>

          <CommentReaction commentId={commentId} isGhostCmt={isGhostCmt}/>
        </div>
      </div>
     
      {replies.length > 0 ? (
        <div className="ml-10">
          <Comments comments={replies} />
        </div>
      ) : null}
    </>
  );
})