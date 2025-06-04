import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";
import { Card, CardContent, CardHeader } from "../ui/card";

export const LeftSidebar = ({ totalPosts, totalComments }) => {
  return (
    <div className="left_side flex flex-col gap-4">
      <Card className="">
        <CardHeader>
           <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
            Skills
          </h3>
          <hr/>
        </CardHeader>
        <CardContent className="skills  rounded-md">
         
          <p className="">Js, tailwind, NodJs, ReactJs</p>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader>
           <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
            Stats
          </h3>
          <hr/>
        </CardHeader>
        <CardContent className="post_statrounded-md">
          <div className="flex items-center total_posts mb-4">
            <LuScrollText className="mr-2" />

            <span className="text-fs_base">{`${totalPosts} posts published`}</span>
          </div>

          <div className="flex items-center total_comments mb-4">
            <FaRegComment className="mr-2" />

            <span className="text-fs_base">{`${totalComments} comments written`}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
