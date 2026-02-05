import { forwardRef } from "react";
import { Article } from "../Article/Article";
import { v4 as uuidv4 } from "uuid";


export const ArticleSection = forwardRef(
  ({ postData, mutationLocation, totalPosts }, ref) => {
    //fetching next posts as soon as we hit third-last post.
    const thirdLastElementIndex = totalPosts > 1 ?totalPosts : 0;

    
    return (
      <>
        <div className="article_list flex flex-col gap-4">
          {Object.keys(postData).map((postId, i) => {

            const post = postData[postId];
            return (
              <Article
                postData={post}
                key={uuidv4()}
                ref={thirdLastElementIndex === i + 1 ? ref : null}
                mutationLocation={mutationLocation}
              />
            );
          })}
        </div>
      </>
    );
  },
);
