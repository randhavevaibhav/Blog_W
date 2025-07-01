import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import React from "react";
import { Link } from "react-router-dom";

export const RecentComment = ({ comment }) => {
  const { content, postId, userId, createdAt, firstName, profileImgURL } =
    comment;

  const publishDate = new Date(createdAt);
  const publishDayDate = format(publishDate, "dd", { locale: enUS });

  const publishMonth = format(publishDate, "MMM", { locale: enUS });
  const publishYear = publishDate
    .getFullYear()
    .toString()
    .split("")
    .slice(2)
    .join("");
  return (
    <div className="grid grid-cols-[25px_auto] gap-2 cursor-pointer">
      <Link
        to={`/userprofile/${userId}`}
        className={`mt-2 pointer-events-auto`}
      >
        <UserAvatar userProfileImg={profileImgURL} avatarSize="xsmall" />
      </Link>
      <div>
        <Link
          to={`/post/${userId}/${postId}`}
          className={`mt-2 pointer-events-auto`}
        >
          <Card
            className={`mb-1 border-card-border bg-card-bg hover:bg-card-bg-hover pt-3 pb-1 px-4 shadow-none`}
          >
            <CardHeader className="p-0">
              <header className="flex justify-between items-center ">
                <div className="content flex items-center">
                  <div className="">
                    <span className="mr-4 text-fs_small font-bold capitalize text-[#a7a7a7]">
                      {firstName}
                    </span>
                    <span className="text-fs_xs text-gray-400">
                      {publishDayDate}&nbsp;{publishMonth}&nbsp;&nbsp;
                      {publishYear}
                    </span>
                  </div>
                </div>
              </header>
            </CardHeader>
            <CardContent className="p-1">
              <div className="flex flex-col gap-4 indiviual_comment w-full">
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
