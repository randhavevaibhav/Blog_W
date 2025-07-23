import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFormattedDateString } from "@/utils/utils";

import React from "react";
import { Link } from "react-router-dom";

export const RecentComment = ({ comment }) => {
  const { content, postId, userId, createdAt, firstName, profileImgURL } =
    comment;

  const formattedDateStr = getFormattedDateString({ createdAt });
  return (
    <div className="grid grid-cols-[25px_auto] gap-2 cursor-pointer">
      <Link
        to={`/userprofile/${userId}`}
        className={`mt-2 pointer-events-auto`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserAvatar userProfileImg={profileImgURL} avatarSize="xSmall" />
      </Link>
      <div>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={`post/${userId}/${postId}#comments`}
        >
          <Card
            className={`mb-1 border-card-border bg-card-bg md:hover:bg-card-bg-hover md:pt-3 pt-2 pb-1 md:px-4 px-2 shadow-none`}
          >
            <CardHeader className="p-0">
              <header className="flex justify-between items-center ">
                <div className="content flex items-center">
                  <div className="">
                    <span className="mr-4 text-fs_small font-semibold capitalize text-text-fade">
                      {firstName}
                    </span>
                    <span className="text-fs_xs text-text-fade">
                      {formattedDateStr}
                    </span>
                  </div>
                </div>
              </header>
            </CardHeader>
            <CardContent className="p-1">
              <div className="flex flex-col gap-4 w-full">
                <div className="comment_body">
                  <p className="text-fs_xs px-1">{content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};
