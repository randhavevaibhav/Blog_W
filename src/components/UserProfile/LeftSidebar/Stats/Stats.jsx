import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "../../../ui/card";
import { LuScrollText } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

export const Stats = memo(
  ({ totalPosts, totalComments, totalFollowers, totalFollowings,userId }) => {

    const {preFetchUserFollowers,preFetchUserFollowings} = usePrefetch();
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

            <span className="text-fs_base">{`${totalPosts} ${
              parseInt(totalPosts) > 1 ? `posts` : `post`
            } published`}</span>
          </div>

          <div className="flex items-center total_comments mb-4">
            <FaRegComment className="mr-2" />

            <span className="text-fs_base">{`${totalComments} comments written`}</span>
          </div>
          <Link to={`/user/${userId}/followers`} onMouseOver={()=>{
              preFetchUserFollowers({userId})
            }}>
            <div className="flex items-center total_followers mb-4">
              <IoPersonSharp className="mr-2" />

              <span className="text-fs_base">{`${totalFollowers} followers`}</span>
            </div>
          </Link>
          <Link to={`/user/${userId}/followings`} onMouseOver={()=>{
              preFetchUserFollowings({userId})
            }}>
            <div className="flex items-center total_followers mb-4">
              <IoPersonSharp className="mr-2" />

              <span className="text-fs_base">{`${totalFollowings} following users`}</span>
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }
);
