import React, { forwardRef } from "react";
import { Article } from "./Article/Article";
import { v4 as uuidv4 } from "uuid";
export const ArticleSection = forwardRef(({ posts },ref) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          return <Article post={post} key={uuidv4()} ref={ref}/>;
        })}
      </div>
    </>
  );
})
