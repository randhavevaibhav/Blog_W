import { forwardRef, useState } from "react";

import { Link } from "react-router-dom";

import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateHomePageBookmark } from "@/hooks/bookmark/useCreateHomePageBookmark";
import { useRemoveHomePageBookmark } from "@/hooks/bookmark/useRemoveHomePageBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";
import PostArticle from "@/components/common/PostContainer/PostContainer";
import Loading from "@/pages/Loading/Loading";
import Error from "@/pages/Error/Error";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";

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
   const {
      data: userData,
      isPending,
      isError,
      error,
    } = useGetUserInfo({ userId, currentUserId });
  
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

   if (isPending) {
    return <Loading>Loading user info...</Loading>;
  }

  if (isError) {
    console.error(error);
    return <Error>Error while fetching userInfo !</Error>;
  }

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

const userInfo = userData.userInfo;
const {isFollowed,bio,location,email,registeredAt} = userInfo;
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
              <PostArticle.PostAuthorNameWithAuthorInfoPopOver
                userId={userId}
                userName={firstName}
                userProfileImg={profileImgURL}
                userEmail={email}
                bio={bio}
                userLocation={location}
                userJoinedOn={registeredAt}
                isFollowed={isFollowed}
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
