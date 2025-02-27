import React from "react";
import { Reactions } from "../../Dashboard/PostContainer/Reactions/Reactions";

export const LeftSidebar = ({likes}) => {
  return (
    <aside className="p-2">
      <Reactions
        className={`grid grid-cols-1 fixed justify-stretch gap-10 top-[10rem] `}
        iconsSize={`1.6rem`}
        likeCount={likes ? likes : 0}
        commentCount={0}
      />
    </aside>
  );
};
