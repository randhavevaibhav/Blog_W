import { forwardRef } from "react";

import { Article } from "../Article/Article";

import { v4 as uuidv4 } from "uuid";

export const ArticleSection = forwardRef(({ postData }, ref) => {
  return (
    <>
      <div className="article_list flex flex-col gap-4">
        {postData.map((post, i) => (
          <Article
            postData={post}
            key={uuidv4()}
            ref={postData.length === i + 1 ? ref : null}
          />
        ))}
      </div>
    </>
  );
});
