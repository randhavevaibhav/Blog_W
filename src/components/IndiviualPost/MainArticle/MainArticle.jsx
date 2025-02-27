import React from "react";
import { MarkDown } from "../../MarkDown/MarkDown";
import { format } from "date-fns";

export const MainArticle = ({imgURL,postTitle,content,createdAt}) => {
  return (
    <main className="p-2">
      <article>
        <header>
          <img
            src={imgURL}
            alt="article image"
            className="w-full max-h-[400px] object-contain"
          />
          <div className="article_heading my-3">
            <h1 className="text-6xl font-bold mb-2">{postTitle}</h1>
             <span className="text-sm text-gray-400 ml-5">Published: {format(new Date(createdAt),"yyyy-MM-dd")}</span>
          </div>
        </header>
        <div className="article_main">
          <MarkDown>{content}</MarkDown>
        </div>
        <section className="comments"></section>
      </article>
    </main>
  );
};
