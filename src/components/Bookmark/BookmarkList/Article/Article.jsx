import { forwardRef } from "react";

import { Link } from "react-router-dom";

import PostArticle from "@/components/common/PostArticle/PostArticle";
import { getUserProfilePageLink } from "@/utils/getLinks";

export const Article = forwardRef(({ postData,debouncedPrefetch }, ref) => {
  const {
    authorId,
    authorName,
    postId,
    titleImgURL,
    title,
    createdAt,
    profileImgURL,
    likes,
    comments,
    tagList,
  } = postData;

  return (
    <>
      <PostArticle
        userId={authorId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
        debouncedPrefetch={debouncedPrefetch}
      >
        <PostArticle.Wrapper>
          <PostArticle.Header>
            <Link
              to={getUserProfilePageLink({
                userId:authorId
              })}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostArticle.UserProfile profileImg={profileImgURL} />
            </Link>
            <PostArticle.Author>
              <PostArticle.UserInfoPopOver
                userId={authorId}
                firstName={authorName}
              />
              <PostArticle.PostPublish createdAt={createdAt} />
            </PostArticle.Author>
          </PostArticle.Header>
          <PostArticle.Body className={`mb-2`}>
            <PostArticle.PostTitle postId={postId} title={title}>
              <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-semibold capitalize mt-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostTags tagList={tagList} className={`mb-2`} />

            <div className="flex justify-between">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={comments}
              />
            </div>
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    </>
  );
});
