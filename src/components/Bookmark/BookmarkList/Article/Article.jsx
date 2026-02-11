import { forwardRef } from "react";
import { Link } from "react-router-dom";
import PostArticle from "@/components/common/PostArticle/PostArticle";
import { getUserProfilePageLink } from "@/utils/getLinks";
import { FaBookmark } from "react-icons/fa";
import { getFormattedDateString } from "@/utils/utils";

const BookmarkedAt = ({ bookmarkedAt }) => {
  const formattedBookmarkedDateStr = getFormattedDateString({
    date: bookmarkedAt,
  });
  return (
    <div className="flex gap-2 items-center">
      <FaBookmark size={"12px"} />
      <span className="text-fs_xs text-text-fade">
        Bookmarked At&nbsp;:&nbsp;&nbsp;{formattedBookmarkedDateStr}
      </span>
    </div>
  );
};

export const Article = forwardRef(({ postData, debouncedPrefetch }, ref) => {
  const {
    userId,
    firstName,
    postId,
    titleImgURL,
    title,
    postCreatedAt,
    profileImgURL,
    likes,
    comments,
    hashtags,
    bookmarkedAt,
  } = postData;

  return (
    <>
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
        debouncedPrefetch={debouncedPrefetch}
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
              <div className="flex gap-4">
                <PostArticle.PostPublish createdAt={postCreatedAt} />
              </div>
            </PostArticle.Author>
          </PostArticle.Header>
          <PostArticle.Body className={`mb-2`}>
            <PostArticle.PostTitle postId={postId} title={title}>
              <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-semibold capitalize mt-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostTags tagList={hashtags} className={`mb-2`} />

            <div className="flex justify-between">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={comments}
              />
              <BookmarkedAt bookmarkedAt={bookmarkedAt}/>
            </div>
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    </>
  );
});
