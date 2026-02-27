import React, { memo } from "react";
import PostArticle from "@/components/common/PostArticle/PostArticle";
import { BsFileEarmarkPost } from "react-icons/bs";
export const RecentPost = memo(({ recentPost }) => {
  if (!recentPost) {
    return <p className="">No posts yet.</p>;
  }

  return (
    <PostArticle userId={recentPost.userId} postId={recentPost.postId}>
      <PostArticle.Wrapper className={`bg-card-bg pb-2`}>
        <PostArticle.PostTitle
          postId={recentPost.postId}
          title={recentPost.title}
        >
          <h3 className=" flex items-center gap-2 capitalize font-semibold lg:text-2xl text-xl tracking-wide w-fit mb-2">
            <BsFileEarmarkPost className="flex-none"/>
            Recent post
          </h3>
         
          <h4 className="text-xl text-text-primary hover:text-action-color font-semibold capitalize mb-2">
            {recentPost.title}
          </h4>
        </PostArticle.PostTitle>

        <div className="flex flex-col gap-3">
          <PostArticle.PostPublish createdAt={recentPost.createdAt} />
          <PostArticle.PostReactions
            likes={recentPost.likes}
            totalComments={recentPost.comments}
          />
        </div>
      </PostArticle.Wrapper>
    </PostArticle>
  );
});
