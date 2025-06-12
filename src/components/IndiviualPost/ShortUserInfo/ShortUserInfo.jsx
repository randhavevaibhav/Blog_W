import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import React, { memo } from "react";
import { IoMail } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

export const ShortUserInfo = memo(({ userName, userProfileImg, userEmail, userLocation, userJoinedOn }) => {
  // 
  const joinedDate = format(new Date(userJoinedOn), "yyyy-MM-dd");
  const { userId } = useParams();
  // console.log("shortinfo re-render")
  return (
    <aside className="md:block hidden">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Link to={`/userprofile/${userId}`}>
            <UserAvatar userProfileImg={userProfileImg} />
          </Link>
          <h3 className="text-fs_xl text-gray-400">{userName}</h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-fs_small text-gray-400">
            <p className="capitalize text-primary font-semibold">JOINED</p>
            <p>{joinedDate}</p>
          </div>
          <hr />
          {userLocation ? (
            <div className="text-fs_small text-gray-400">
              <p className="capitalize text-primary font-semibold">LOCATION</p>
              <p>{userLocation}</p>
            </div>
          ) : null}
          <div className="text-fs_small text-gray-400">
            <p className="capitalize text-primary font-semibold">MAIL</p>
            <a
              href="mailto:testusermail@gmail.com"
              className="flex gap-2 items-center text-gray-400"
            >
              <IoMail />
              {userEmail}
            </a>
          </div>
          <hr />
        </CardContent>
      </Card>
    </aside>
  );
})
