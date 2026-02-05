import { forwardRef } from "react";

import { Link } from "react-router-dom";

import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateHomePageBookmark } from "@/hooks/bookmark/useCreateHomePageBookmark";
import { useRemoveHomePageBookmark } from "@/hooks/bookmark/useRemoveHomePageBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import PostArticle from "@/components/common/PostArticle/PostArticle";
import { getUserProfilePageLink } from "@/utils/getLinks";

export const Article = forwardRef(
  ({ postData, mutationLocation, debouncedPrefetch }, ref) => {
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
      hashtags,
    } = postData;


    const hasRecentComments = recentComments?recentComments.length >= 1 ? true : false:false;

    const { auth } = useAuth();

    const { userId: currentUserId, accessToken } = auth;

    const { checkLogin, showRequireLoginModal, hideLoginModal } =
      useRequireLogin({ accessToken });
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
          isBookmarked={isBookmarked}
          ref={ref}
          debouncedPrefetch={debouncedPrefetch}
        >
          <PostArticle.Wrapper>
            <PostArticle.Header>
              <Link
                to={getUserProfilePageLink({
                  userId
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
                <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-semibold capitalize mt-2">
                  {title}
                </h4>
              </PostArticle.PostTitle>
              <PostArticle.PostTags tagList={hashtags} />

              {hasRecentComments ? (
                <RecentCommentsList recentComments={recentComments} postId={postId}/>
              ) : null}

              <div className="flex justify-between items-center">
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
            </PostArticle.Body>
          </PostArticle.Wrapper>
        </PostArticle>
      </>
    );
  }
);
