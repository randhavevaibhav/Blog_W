import React, { memo, useCallback } from "react";
import { debounce } from "@/utils/utils";
import PostArticle from "@/components/common/PostArticle/PostArticle";

export const RecentPost = memo(({ recentPost }) => {


  if (!recentPost) {
    return <p className="">No posts yet.</p>;
  }

  return (
    <>
      <PostArticle
        userId={recentPost.userId}
        postId={recentPost.postId}
      >
        <PostArticle.Wrapper className={`bg-bg-shade pb-2`}>
          <PostArticle.PostTitle
            postId={recentPost.postId}
            title={recentPost.title}
          >
            <h3 className="capitalize font-medium text-fs_xl tracking-wide mb-1">
              Recent post
            </h3>
            <hr />
            <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-semibold capitalize mb-2">
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
    </>
  );
});
