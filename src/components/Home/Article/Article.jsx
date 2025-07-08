import { forwardRef, useState } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link, useNavigate } from "react-router-dom";

import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateHomePageBookmark } from "@/hooks/bookmark/useCreateHomePageBookmark";
import { useRemoveHomePageBookmark } from "@/hooks/bookmark/useRemoveHomePageBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";

export const Article = forwardRef(({ postData ,mutationLocation}, ref) => {
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
    recentComments=[],
    isBookmarked,
    page
  } = postData;

  const hasRecentComments = recentComments.length >= 1 ? true : false;
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);
  const navigate = useNavigate();
  const { preFetchIndiviualPost, preFetchUserInfo } = usePrefetch();
  const { auth } = useAuth();
  const { userId: currentUserId, accessToken } = auth;
  const { createBookmark } = useCreateHomePageBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation
  });
  const { removeBookmark } = useRemoveHomePageBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation
  });

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark({
        page
      });
    } else {
      createBookmark({
        page
      });
    }
  };

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      cb();
    } else {
      setShowRequireLoginModal(true);
      return null;
    }
  };

  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
      ) : null}
      <article
        className="rounded-md cursor-pointer"
        ref={ref}
        onMouseOver={() =>
          preFetchIndiviualPost({ userId, postId, imgURL: titleImgURL })
        }
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
              <PostContainer.PostAutherName userName={firstName} />
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
                  likeCount={likes}
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
