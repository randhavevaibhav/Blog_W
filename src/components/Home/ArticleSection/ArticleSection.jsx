import { forwardRef, useCallback } from "react";

import { Article } from "../Article/Article";

import { v4 as uuidv4 } from "uuid";
import { throttle } from "@/utils/utils";


export const ArticleSection = forwardRef(({ postData ,mutationLocation}, ref) => {
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length>1?(postData.length -2):0;
  const throttlePrefetch = useCallback(throttle({cb:(prefetchFn)=>prefetchFn()}))
  return (
    <>
      <div className="article_list flex flex-col gap-4">
        {postData.map((post, i) => (
          <Article
            postData={post}
            key={uuidv4()}
            ref={thirdLastElementIndex === i + 1 ? ref : null}
            mutationLocation={mutationLocation}
            throttlePrefetch={throttlePrefetch}
          />
        ))}
      </div>
    </>
  );
});
