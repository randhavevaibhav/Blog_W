import React, { forwardRef, useCallback } from "react";
import { Article } from "./Article/Article";
import { v4 as uuidv4 } from "uuid";
import { throttle } from "@/utils/utils";
export const ArticleSection = forwardRef(({ posts },ref) => {
  const throttlePrefetch = useCallback(throttle({cb:(prefetchFn)=>prefetchFn()}))
  return (
    <>
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          return <Article post={post} key={uuidv4()} ref={ref} throttlePrefetch={throttlePrefetch}/>;
        })}
      </div>
    </>
  );
})
