import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LuScrollText } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { useAuth } from "@/hooks/auth/useAuth";
import { formatNumber } from "@/utils/utils";
import { getFollowersPageLink, getFollowingsPageLink } from "@/utils/getLinks";
import { IoStatsChart } from "react-icons/io5";

export const Stats = memo(
  ({ totalPosts, totalComments, totalFollowers, totalFollowings, userId }) => {
    const { auth } = useAuth();
    const { userId: currentUserId } = auth;

    const isCurrentUser =
      parseInt(userId) === parseInt(currentUserId) ? true : false;

    const { preFetchUserFollowers, preFetchUserFollowings } = usePrefetch();
    return (
      <Card className="bg-card-bg">
        <CardHeader>
          <h3 className="capitalize font-semibold lg:text-2xl text-xl tracking-wide w-fit flex items-baseline gap-2">
            <IoStatsChart className="flex-none" />
            Stats
          </h3>
        </CardHeader>
        <CardContent className="post_statrounded-md">
          <div className="flex items-center total_posts mb-4">
            <LuScrollText className="mr-2" />

            <span
              className="text-fs_base"
              data-test={"total-posts"}
              data-value={totalPosts}
            >{`${formatNumber(
              parseInt(totalPosts),
            )} ${parseInt(totalPosts) > 1 ? `posts` : `post`} published`}</span>
          </div>

          <div className="flex items-center total_comments mb-4">
            <FaRegComment className="mr-2" />

            <span
              className="text-fs_base"
              data-test={"total-comments"}
              data-value={totalComments}
            >{`${formatNumber(
              parseInt(totalComments),
            )} comments written`}</span>
          </div>
          {isCurrentUser ? (
            <>
              <Link
                to={getFollowersPageLink()}
                onMouseOver={() => {
                  preFetchUserFollowers({ userId });
                }}
              >
                <div className="flex items-center total_followers mb-4">
                  <IoPersonSharp className="mr-2" />

                  <span
                    className="text-fs_base"
                    data-test={"total-followers"}
                    data-value={totalFollowers}
                  >{`${formatNumber(
                    parseInt(totalFollowers),
                  )} followers`}</span>
                </div>
              </Link>
              <Link
                to={getFollowingsPageLink()}
                onMouseOver={() => {
                  preFetchUserFollowings({ userId });
                }}
              >
                <div className="flex items-center total_followers mb-4">
                  <IoPersonSharp className="mr-2" />

                  <span
                    className="text-fs_base"
                    data-test={"total-following-users"}
                    data-value={totalFollowings}
                  >{`${formatNumber(
                    parseInt(totalFollowings),
                  )} following users`}</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center total_followers mb-4">
                <IoPersonSharp className="mr-2" />

                <span
                  className="text-fs_base"
                  data-test={"total-followers"}
                  data-value={totalFollowers}
                >{`${formatNumber(parseInt(totalFollowers))} followers`}</span>
              </div>

              <div className="flex items-center total_followers mb-4">
                <IoPersonSharp className="mr-2" />

                <span
                  className="text-fs_base"
                  data-test={"total-following-users"}
                  data-value={totalFollowings}
                >{`${formatNumber(
                  parseInt(totalFollowings),
                )} following users`}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  },
);
