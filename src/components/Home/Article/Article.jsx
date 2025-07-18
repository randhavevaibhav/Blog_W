import { forwardRef } from "react";

import { Link } from "react-router-dom";

import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateHomePageBookmark } from "@/hooks/bookmark/useCreateHomePageBookmark";
import { useRemoveHomePageBookmark } from "@/hooks/bookmark/useRemoveHomePageBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import PostArticle from "@/components/common/PostArticle/PostArticle";

export const Article = forwardRef(({ postData, mutationLocation }, ref) => {
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
    recentComments = [],
    isBookmarked,
    page,
    tagList,
  } = postData;

  const hasRecentComments = recentComments.length >= 1 ? true : false;

  const { auth } = useAuth();

  const { userId: currentUserId, accessToken } = auth;

  const { checkLogin, showRequireLoginModal, hideLoginModal } = useRequireLogin(
    { accessToken }
  );
  const { createBookmark } = useCreateHomePageBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation,
  });
  const { removeBookmark } = useRemoveHomePageBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation,
  });

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark({
        page,
      });
    } else {
      createBookmark({
        page,
      });
    }
  };

  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => hideLoginModal()} />
      ) : null}
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
            <PostArticle.PostTags tagList={tagList} />

            <div className="flex justify-between items-center mb-2">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={totalComments}
              />
              <PostArticle.PostBookMark
                isBookmarked={isBookmarked}
                handleBookmark={(e) => {
                  e.stopPropagation();
                  checkLogin(handleBookmark);
                }}
              />
            </div>
            {hasRecentComments ? (
              <RecentCommentsList recentComments={recentComments} />
            ) : null}
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    </>
  );
});
