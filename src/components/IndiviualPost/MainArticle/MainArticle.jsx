import React, { forwardRef, memo } from "react";

import { Link, useParams } from "react-router-dom";
import { MarkDown } from "../../common/MarkDown/MarkDown";
import { format } from "date-fns";

import { UserAvatar } from "../../common/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

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
        // console.log("MainArticle re-render !")
      const {userId} = useParams();
      const {preFetchUserInfo} = usePrefetch();
      return (
        <>
         <Card className="main_article bg-bg-shade rounded-t-xl rounded-b-none border-b-0">
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
                <div className="flex items-center gap-2 my-3  px-4 py-2 rounded-md max-w-fit">
                   <Link to={`/userprofile/${userId}`} onMouseOver={()=>preFetchUserInfo({userId})}>
                    <UserAvatar userProfileImg={userProfileImg} />
                   </Link>
                   
                    <div className="flex flex-col">
                      <Link to={`#`} className="text-xl font-bold mr-2">
                        {userName}
                      </Link>
                      <span className="md:text-fs_small text-fs_xs text-gray-400">
                        Published: {format(new Date(createdAt), "yyyy-MM-dd")}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-fs_5xl font-extrabold my-2 tracking-[-0.011em] capitalize">
                    {postTitle}
                  </h1>
               
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
