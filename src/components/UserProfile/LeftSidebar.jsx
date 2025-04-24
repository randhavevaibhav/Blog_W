import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";

export const LeftSidebar = ({ totalPosts, totalComments }) => {
  return (
    <div className="left_side flex flex-col gap-4">
      <div className="skills bg-bg-shade p-4 rounded-md">
        <h3 className="capitalize font-medium text-fs_2xl tracking-wide">Skills</h3>
        <p className="">Js, tailwind, NodJs, ReactJs</p>
      </div>
      <div className="post_stat bg-bg-shade p-4 rounded-md">
        <div className="flex items-center total_posts mb-4">
          <LuScrollText className="mr-2" />

          <span className="text-fs_base">{`${totalPosts} posts published`}</span>
        </div>

        <div className="flex items-center total_comments mb-4">
          <FaRegComment className="mr-2" />

          <span className="text-fs_base">{`${totalComments} comments written`}</span>
        </div>
      </div>
    </div>
  );
};
