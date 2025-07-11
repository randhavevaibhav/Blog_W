import FollowButton from "@/components/common/FollowButton/FollowButton";
import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getFormattedDateString } from "@/utils/utils";
import React, { memo } from "react";
import { IoMail } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export const ShortUserInfo = memo(
  ({
    userName,
    userProfileImg,
    userEmail,
    userLocation,
    userJoinedOn,
    isFollowed,
  }) => {
    //
    const { auth } = useAuth();
    const { userId: currentUserId } = auth;
    const { userId, postId } = useParams();
    const { preFetchUserInfo } = usePrefetch();
    const navigate = useNavigate();

    const formattedDateStr = getFormattedDateString({
      createdAt: userJoinedOn,
    });
    const isCurrentUser = parseInt(userId) === parseInt(currentUserId);

    const handleEditUserProfile = () => {
      navigate(`/userprofile/edit/${currentUserId}`);
    };

    return (
      <>
        <aside className="md:block hidden">
          <Card className="bg-card-bg">
            <CardHeader
              className="flex flex-row  gap-4 cursor-pointer"
              onMouseOver={() => preFetchUserInfo({ userId })}
              onClick={() => {
                navigate(`/userprofile/${userId}`);
              }}
            >
              <UserAvatar userProfileImg={userProfileImg} />

              <h3 className="text-fs_xl text-gray-400">{userName}</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="text-fs_small text-gray-400">
                <p className="capitalize text-primary font-semibold">JOINED</p>
                <p>{formattedDateStr}</p>
              </div>
              <hr />
              {userLocation ? (
                <div className="text-fs_small text-gray-400">
                  <p className="capitalize text-primary font-semibold">
                    LOCATION
                  </p>
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
              {!isCurrentUser ? (
                <FollowButton
                  isFollowed={isFollowed}
                  currentUserId={currentUserId}
                  userId={userId}
                />
              ) : (
                <Button
                  variant={`action`}
                  className={`cursor-pointer`}
                  onClick={handleEditUserProfile}
                >
                  Edit User
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>
      </>
    );
  }
);
