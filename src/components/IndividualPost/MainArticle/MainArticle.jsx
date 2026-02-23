import React, { forwardRef, memo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { FaPrint } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { UserInfoHeader } from "./UserInfoHeader/UserInfoHeader";
import PostContainer from "@/components/common/PostArticle/PostArticle";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import "./main-article.css";
import { getEditPostPageLink } from "@/utils/getLinks";

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
        tagList,
        userId,
      },
      ref
    ) => {
      // console.log("MainArticle re-render !")
      const { postId } = useParams();
      const { auth } = useAuth();
      const { userId: currentUserId } = auth;
      const navigate = useNavigate();
      const isPostBelongsToUser = parseInt(currentUserId) === parseInt(userId);
      const { preFetchAllHashtags } = usePrefetch();

      return (
        <>
          <Card
            className="main_article bg-card-bg rounded-t-xl rounded-b-none"
            ref={ref}
          >
            <CardContent className="md:p-6 p-2">
              {postTitleImgURL ? (
                <img
                  src={postTitleImgURL}
                  alt={`article image`}
                  className="article-loading w-full md:h-[400px] md:object-cover object-contain"
                  width={600}
                  height={400}
                />
              ) : null}
              <article id="main_article" className="">
                <header className="mb-6">
                  <div className="article_heading">
                    <UserInfoHeader
                      userId={userId}
                      userProfileImg={userProfileImg}
                      userName={userName}
                      createdAt={createdAt}
                    />
                    <h1 className="md:text-fs_4xl text-fs_3xl font- font-semibold my-2 tracking-[-0.011em] capitalize">
                      {postTitle}
                    </h1>

                    <PostContainer.PostTags
                      tagList={tagList}
                      className={`mb-4`}
                    />
                  </div>
                  <div className="flex gap-4 my-2">
                    <Button
                      onClick={() => reactToPrintFn()}
                      className={`cursor-pointer px-3 py-4 h-7`}
                    >
                      Print <FaPrint />
                    </Button>
                    {isPostBelongsToUser ? (
                      <Button
                        className={`  px-3 py-4  cursor-pointer h-7 border  border-[#f59e0b33] bg-[#f59e0b33]
                          hover:bg-[#be780033]`}
                        variant="ghost"
                        onClick={() => navigate(getEditPostPageLink({
                          postId
                        }))}
                        onMouseOver={() => preFetchAllHashtags()}
                        data-test={"edit-post-btn"}
                      >
                        <span className="tracking-wide ">Edit</span>
                      </Button>
                    ) : null}
                  </div>
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
