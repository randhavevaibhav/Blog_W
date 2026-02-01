import React, { memo, useCallback } from "react";
import { throttle } from "@/utils/utils";
import PostArticle from "@/components/common/PostArticle/PostArticle";

export const RecentPost = memo(({ recentPost }) => {
  const throttlePrefetch = useCallback(
    throttle({ cb: (prefetchFn) => prefetchFn() })
  );

  if (!recentPost) {
    return <p className="">No posts yet.</p>;
  }

  return (
    <>
      <PostArticle
        userId={recentPost.userId}
        postId={recentPost.postId}
        throttlePrefetch={throttlePrefetch}
      >
        <PostArticle.Wrapper className={`bg-bg-shade pb-2`}>
          <PostArticle.PostTitle
            userId={recentPost.userId}
            postId={recentPost.postId}
          >
            <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-extrabold capitalize mb-2">
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
