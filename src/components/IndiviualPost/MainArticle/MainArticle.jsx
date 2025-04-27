import React, { forwardRef, memo } from "react";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";

import { UserAvatar } from "../../common/UserAvatar/UserAvatar";

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
        userProfileImg,
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

              <div className="article_heading my-6">
                <h1 className="text-fs_5xl font-extrabold my-2 tracking-[-0.011em] capitalize">
                  {postTitle}
                </h1>
                <div className="flex items-center gap-2 my-6 bg-bg-shade px-4 py-2 rounded-md max-w-fit">
                  <UserAvatar userProfileImg={userProfileImg} />
                  <div>
                    <Link to={`#`} className="text-2xl font-bold mr-2">
                      {userName}
                    </Link>
                    <span className="md:text-fs_small text-fs_xs text-gray-400">
                      Published: {format(new Date(createdAt), "yyyy-MM-dd")}
                    </span>
                  </div>
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
