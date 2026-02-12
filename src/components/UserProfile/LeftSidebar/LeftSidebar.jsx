import React from "react";
import { Skills } from "./Skills/Skills";
import { Stats } from "./Stats/Stats";


export const LeftSidebar = ({
  userId,
  skills,
  totalPosts,
  totalComments,
  totalFollowers,
  totalFollowings,
}) => {
  
  return (
    <div className="left_side flex flex-col gap-4">
      {skills ? <Skills skills={skills} /> : null}
      <Stats
        totalPosts={totalPosts}
        totalComments={totalComments}
        totalFollowers={totalFollowers}
        totalFollowings={totalFollowings}
        userId={userId}
      />
    </div>
  );
};
