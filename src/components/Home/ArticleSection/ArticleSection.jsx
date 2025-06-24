import { forwardRef } from "react";

import { Article } from "../Article/Article";

import { v4 as uuidv4 } from "uuid";

export const ArticleSection = forwardRef(({ postData }, ref) => {
  //fetching next posts as soon as we hit third-last post.
  const thirdLastElementIndex = postData.length>1?(postData.length -2):0;
  return (
    <>
      <div className="article_list flex flex-col gap-4">
        {postData.map((post, i) => (
          <Article
            postData={post}
            key={uuidv4()}
            ref={thirdLastElementIndex === i + 1 ? ref : null}
          />
        ))}
      </div>
    </>
  );
});
