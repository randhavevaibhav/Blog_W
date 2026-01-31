import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "../../../ui/card";
import { LuScrollText } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { useAuth } from "@/hooks/auth/useAuth";
import { formatNumber } from "@/utils/utils";

export const Stats = memo(
  ({ totalPosts, totalComments, totalFollowers, totalFollowings, userId }) => {
    const { auth } = useAuth();
    const { userId: currentUserId } = auth;

    const isCurrentUser =
      parseInt(userId) === parseInt(currentUserId) ? true : false;

    const { preFetchUserFollowers, preFetchUserFollowings } = usePrefetch();
    return (
      <Card className="bg-bg-shade">
        <CardHeader>
          <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
            Stats
          </h3>
          <hr />
        </CardHeader>
        <CardContent className="post_statrounded-md">
          <div className="flex items-center total_posts mb-4">
            <LuScrollText className="mr-2" />

            <span className="text-fs_base">{`${formatNumber(
              parseInt(totalPosts)
            )} ${parseInt(totalPosts) > 1 ? `posts` : `post`} published`}</span>
          </div>

          <div className="flex items-center total_comments mb-4">
            <FaRegComment className="mr-2" />

            <span className="text-fs_base">{`${formatNumber(
              parseInt(totalComments)
            )} comments written`}</span>
          </div>
          {isCurrentUser ? (
            <>
              <Link
                to={`/followers`}
                onMouseOver={() => {
                  preFetchUserFollowers({ userId });
                }}
              >
                <div className="flex items-center total_followers mb-4">
                  <IoPersonSharp className="mr-2" />

                  <span className="text-fs_base">{`${formatNumber(
                    parseInt(totalFollowers)
                  )} followers`}</span>
                </div>
              </Link>
              <Link
                to={`/followings`}
                onMouseOver={() => {
                  preFetchUserFollowings({ userId });
                }}
              >
                <div className="flex items-center total_followers mb-4">
                  <IoPersonSharp className="mr-2" />

                  <span className="text-fs_base">{`${formatNumber(
                    parseInt(totalFollowings)
                  )} following users`}</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center total_followers mb-4">
                <IoPersonSharp className="mr-2" />

                <span className="text-fs_base">{`${formatNumber(
                  parseInt(totalFollowers)
                )} followers`}</span>
              </div>

              <div className="flex items-center total_followers mb-4">
                <IoPersonSharp className="mr-2" />

                <span className="text-fs_base">{`${formatNumber(
                  parseInt(totalFollowings)
                )} following users`}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  }
);
