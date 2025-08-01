import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PostArticle from "../../common/PostArticle/PostArticle";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    firstName,
    postId,
    titleImgURL,
    title,
    createdAt,
    likes,
    totalComments,
    profileImgURL,
    tagList,
  } = postData;

  return (
    <>
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
      >
        <PostArticle.Wrapper>
          <PostArticle.Header>
            <Link
              to={`/userprofile/${userId}`}
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
          <PostArticle.Body>
            <PostArticle.PostTitle userId={userId} postId={postId}>
              <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-extrabold capitalize mt-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostTags tagList={tagList} className={`mb-2`} />

            <div className="flex justify-between">
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
