import React, { forwardRef, memo } from "react";
import { Button } from "../../common/Button/Button";
import { Link } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";
import { BsFillPersonFill } from "react-icons/bs";

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
                <h1 className="text-4xl font-bold my-2 tracking-[-0.011em]">
                  {postTitle}
                </h1>
                <div className="flex items-center gap-2 my-6">
                  {!userProfileImg ? (
                    <BsFillPersonFill size={"40px"} className="mr-2" />
                  ) : (
                    <div className="w-[40px] mr-2">
                      <img
                        src={userProfileImg}
                        alt={`user profile image`}
                        className="object-cover aspect-square w-full rounded-full"
                      />
                    </div>
                  )}
                  <div>
                    <Link to={`#`} className="text-2xl font-bold mr-2">
                      {userName}
                    </Link>
                    <span className="text-sm text-gray-400">
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
