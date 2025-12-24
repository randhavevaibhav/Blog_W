import React, { memo, useCallback } from "react";
import { throttle } from "@/utils/utils";
import PostArticle from "@/components/common/PostArticle/PostArticle";

export const RecentPost = memo(({ recentPost }) => {
  const throttlePrefetch = useCallback(
    throttle({ cb: (prefetchFn) => prefetchFn() })
  );
  return (
    <>
      {recentPost ? (
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
              <PostArticle.PostPublish createdAt={recentPost.createdAt} />
              <PostArticle.PostTags
                tagList={recentPost.tagList}
                className={`mb-2`}
              />

              <div className="flex justify-between">
                <PostArticle.PostReactions
                  likes={recentPost.likes}
                  totalComments={recentPost.comments}
                />
              </div>
            </PostArticle.Wrapper>
          </PostArticle>
        </>
      ) : (
        <p className="">No posts yet.</p>
      )}
    </>
  );
});
