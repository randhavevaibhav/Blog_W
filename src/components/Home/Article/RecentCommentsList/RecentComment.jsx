import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPostPageLink, getUserProfilePageLink } from "@/utils/getLinks";
import { getFormattedDateString } from "@/utils/utils";

import React from "react";
import { Link } from "react-router-dom";

export const RecentComment = ({ comment,postId }) => {
  const { content, createdAt, firstName, user } =
    comment;
    const {userId,profileImgUrl} = user;

  const formattedDateStr = getFormattedDateString({ createdAt });
  return (
    <div className="grid grid-cols-[25px_auto] gap-2 cursor-pointer">
      <Link
        to={getUserProfilePageLink({
          userId
        })}
        className={`mt-2 pointer-events-auto`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserAvatar userProfileImg={profileImgUrl} avatarSize="xSmall" />
      </Link>
      <div>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={`${getPostPageLink({postId})}#comments`}
        >
          <Card
            className={`mb-1 border-card-border bg-card-bg md:hover:bg-card-bg-hover pt-[0.30rem] pb-1 md:px-4 px-2 shadow-none`}
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
                  <p className="text-fs_small px-1 line-clamp-3">{content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};
