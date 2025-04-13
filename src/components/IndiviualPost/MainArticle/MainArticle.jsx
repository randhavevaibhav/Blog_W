import React, { forwardRef, memo } from "react";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";

export const MainArticle = memo(
  forwardRef(
    (
      {
        postContent,
        postTitle,
        postTitleImgURL,
        userName,
        createdAt,
        reactToPrintFn,
      },
      ref
    ) => {
      //   console.log("MainArticle re-render !")
      return (
        <>
          <article ref={ref} id="main_article" className="px-2">
            <header>
              {postTitleImgURL ? (
                <img
                  src={postTitleImgURL}
                  alt="article image"
                  className="w-[800px] h-[400px] object-contain"
                />
              ) : null}

              <div className="article_heading my-3">
                <h1 className="text-4xl font-bold my-2 tracking-[-0.011em]">
                  {postTitle}
                </h1>
                <div className="flex flex-col gap-2">
                  <Link to={`#`} className="text-2xl font-bold">
                    {userName}
                  </Link>
                  <span className="text-sm text-gray-400">
                    Published: {format(new Date(createdAt), "yyyy-MM-dd")}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => reactToPrintFn()}
                className={`font-semibold text-sm px-2`}
              >
                Print Article
              </Button>
            </header>
            <div className="article_main">
              <MarkDown>{postContent}</MarkDown>
            </div>
          </article>
        </>
      );
    }
  )
);
