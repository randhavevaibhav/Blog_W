import React from "react";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";
import { CommentSection } from "../CommentSection/CommentSection";
import { Link } from "react-router-dom";

import { RightSidebar } from "../RightSidebar/RightSidebar";
import { LeftSidebar } from "../LeftSidebar/LeftSidebar";


export const MainArticle = ({
  userName,
  imgURL,
  postTitle,
  content,
  createdAt,
  commentsData,
  totalLikesData
}) => {
  
  return (
    <main className="md:px-2 px-6 md:grid md:grid-cols-[4rem_9fr_3fr] min-h-screen gap-3">
      <LeftSidebar
        commentsCount={commentsData ? commentsData.total_comments_count : 0}
        likesCount={totalLikesData ? totalLikesData.totalLikes : 0}
        likedByUser={totalLikesData ? totalLikesData.likedByUser : false}
        
      />
      <article>
        <header>
          {imgURL ? (
            <img
              src={imgURL}
              alt="article image"
              className="w-[800px] h-[400px] object-contain"
            />
          ) : null}
          <div className="article_heading my-3">
            <h1 className="md:text-6xl text-4xl font-bold mb-2">{postTitle}</h1>
            <Link to={`#`} className="text-2xl font-bold">
              {userName}
            </Link>
            <span className="text-sm text-gray-400 ml-5">
              Published: {format(new Date(createdAt), "yyyy-MM-dd")}
            </span>
          </div>
        </header>
        <div className="article_main">
          {content ? <MarkDown>{content}</MarkDown> : null}
        </div>
        <CommentSection data={commentsData ? commentsData : null} />
      </article>
      <RightSidebar />
    </main>
  );
};
