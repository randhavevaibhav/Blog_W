import React from "react";
import { FaRegComment } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";

export const LeftSidebar = ({ totalPosts, totalComments }) => {
  return (
    <div className="left_side flex flex-col gap-4">
      <div className="skills bg-bg-shade p-4 rounded-md">
        <h4 className="title text-lg font-semibold capitalize">Skills</h4>
        <div className="">Js, tailwind, NodJs, ReactJs</div>
      </div>
      <div className="post_stat bg-bg-shade p-4 rounded-md">
        <div className="flex items-center total_posts mb-4">
          <LuScrollText className="mr-2" />

          <span>{`${totalPosts} posts published`}</span>
        </div>

        <div className="flex items-center total_comments mb-4">
          <FaRegComment className="mr-2" />

          <span>{`${totalComments} comments written`}</span>
        </div>
      </div>
    </div>
  );
};
