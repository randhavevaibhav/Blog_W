import React, { forwardRef, memo } from "react";

import { useParams } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { UserInfoHeader } from "./UserInfoHeader/UserInfoHeader";
import PostContainer from "@/components/common/PostContainer/PostContainer";

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
        tagList
      },
      ref
    ) => {
      // console.log("MainArticle re-render !")
      const { userId } = useParams();

      return (
        <>
          <Card className="main_article bg-card-bg rounded-t-xl rounded-b-none">
            <CardContent className="md:p-6 p-2">
              {postTitleImgURL ? (
                <img
                  src={postTitleImgURL}
                  alt="article image"
                  className="w-full md:h-[400px] md:object-cover object-contain"
                />
              ) : null}
              <article ref={ref} id="main_article" className=" py-4">
                <header className="mb-6">
                  <div className="article_heading">
                    <UserInfoHeader
                      userId={userId}
                      userProfileImg={userProfileImg}
                      userName={userName}
                      createdAt={createdAt}
                    />
                    <h1 className="text-fs_5xl font-extrabold my-2 tracking-[-0.011em] capitalize">
                      {postTitle}
                    </h1>
                    <PostContainer.PostTags tagList={tagList} className={`mb-4`}/>
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
            </CardContent>
          </Card>
        </>
      );
    }
  )
);
