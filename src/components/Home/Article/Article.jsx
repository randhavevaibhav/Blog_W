import { forwardRef, useState } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link, useNavigate } from "react-router-dom";

import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateHomePageBookmark } from "@/hooks/bookmark/useCreateHomePageBookmark";
import { useRemoveHomePageBookmark } from "@/hooks/bookmark/useRemoveHomePageBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";

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
  } = postData;

  const hasRecentComments = recentComments.length >= 1 ? true : false;
 
  const navigate = useNavigate();
  const { preFetchIndividualPost, preFetchUserInfo, preFetchPostComments } =
    usePrefetch();
  const { auth } = useAuth();
  const { userId: currentUserId, accessToken } = auth;
  const {checkLogin,showRequireLoginModal,hideLoginModal} = useRequireLogin({accessToken})
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
      <article
        className="rounded-md cursor-pointer"
        ref={ref}
        onMouseOver={() => {
          preFetchIndividualPost({ userId, postId, imgURL: titleImgURL });
          preFetchPostComments({
            postId,
          });
        }}
        onClick={() => {
          navigate(`/post/${userId}/${postId}`);
        }}
      >
        <PostContainer className={`px-4 pt-4 pb-2`}>
          <div className="flex items-start mb-2">
            <Link
              className="pointer-events-auto"
              to={`/userprofile/${userId}`}
              onMouseOver={() => preFetchUserInfo({ userId })}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>
            <div className="flex flex-col gap-1 w-full">
              <PostContainer.PostAuthorName userName={firstName} />
              <PostContainer.PostPublish createdAt={createdAt} />
              <PostContainer.PostTitle
                userId={userId}
                postId={postId}
                className=""
              >
                <h4 className="text-fs_2xl text-text-primary md:hover:text-action-color font-extrabold capitalize">
                  {title}
                </h4>
              </PostContainer.PostTitle>
              <div className="flex justify-between">
                <PostContainer.PostReactions
                  likes={likes}
                  totalComments={totalComments}
                  className={`my-1`}
                  userId={userId}
                  postId={postId}
                />
                <PostContainer.PostBookMark
                  isBookmarked={isBookmarked}
                  handleBookmark={(e) => {
                    e.stopPropagation();
                    checkLogin(handleBookmark);
                  }}
                />
              </div>
            </div>
          </div>
          {hasRecentComments ? (
            <RecentCommentsList recentComments={recentComments} />
          ) : null}
        </PostContainer>
      </article>
    </>
  );
});
