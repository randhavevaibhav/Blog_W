import React from "react";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";
import { CommentSection } from "../CommentSection/CommentSection";

export const MainArticle = ({ imgURL, postTitle, content, createdAt }) => {
  return (
    <main className="md:px-2 px-6">
      <article>
        <header>
          {imgURL ? (
            <img
              src={imgURL}
              alt="article image"
              className="w-full max-h-[400px] object-contain"
            />
          ) : null}
          <div className="article_heading my-3">
            <h1 className="md:text-6xl text-4xl font-bold mb-2">{postTitle}</h1>
            <span className="text-sm text-gray-400 ml-5">
              Published: {format(new Date(createdAt), "yyyy-MM-dd")}
            </span>
          </div>
        </header>
        <div className="article_main">
          {content ? <MarkDown>{content}</MarkDown> : null}
        </div>
      <CommentSection/>
      </article>
    </main>
  );
};
