import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PostArticle from "../../common/PostContainer/PostContainer";

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
              <PostArticle.PostAuthorName userName={firstName} />
              <PostArticle.PostPublish createdAt={createdAt} />
            </PostArticle.Author>
          </PostArticle.Header>
          <PostArticle.Body>
            <PostArticle.PostTitle userId={userId} postId={postId}>
              <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize my-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostTags tagList={tagList} />

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
