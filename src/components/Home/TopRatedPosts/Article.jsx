import PostArticle from "@/components/common/PostArticle/PostArticle";
import { getUserProfilePageLink } from "@/utils/getLinks";
import { throttle } from "@/utils/utils";
import { forwardRef, useCallback } from "react";
import { Link } from "react-router-dom";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    postId,
    firstName,
    profileImgURL,
    title,
    titleImgURL,
    totalComments,
    likes,
    createdAt,
    hashtags,
  } = postData;

   const throttlePrefetch = useCallback(
        throttle({ cb: (prefetchFn) => prefetchFn() }),
      );

  return (
    <>
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
        throttlePrefetch={throttlePrefetch}
      >
        <PostArticle.Wrapper>
          <PostArticle.Header>
            <Link
              to={getUserProfilePageLink({
                userId,
              })}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostArticle.UserProfile profileImg={profileImgURL} />
            </Link>
            <PostArticle.Author>
              <PostArticle.UserInfoPopOver
                userId={userId}
                firstName={firstName}
              />

              <PostArticle.PostPublish createdAt={createdAt} />
            </PostArticle.Author>
          </PostArticle.Header>
          <PostArticle.Body className={`mb-2`}>
            <PostArticle.PostTitle postId={postId} title={title}>
              <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-semibold capitalize mt-2 truncate">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostTags tagList={hashtags} />

            <div className="flex justify-between items-center">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={totalComments}
              />
            </div>
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    </>
  );
});
