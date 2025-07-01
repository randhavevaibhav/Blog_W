import { forwardRef, useState } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link, useNavigate } from "react-router-dom";

import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateBookmark } from "@/hooks/bookmark/useCreateBookmark";
import { useRemoveBookmark } from "@/hooks/bookmark/useRemoveBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";

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
    recentComments,
    isBookmarked,
  } = postData;

  const hasRecentComments = recentComments.length >= 1 ? true : false;
  const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);
  const navigate = useNavigate();
  const { PreFetchIndiviualPost, preFetchUserInfo } = usePrefetch();
  const { auth } = useAuth();
  const { userId: currentUserId, accessToken } = auth;
  const { createBookmark } = useCreateBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation: "homePage",
  });
  const { removeBookmark } = useRemoveBookmark({
    currentUserId,
    userId,
    postId,
    mutationLocation: "homePage",
  });

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (isBookmarked) {
      removeBookmark();
    } else {
      createBookmark();
    }
  };

  const checkLogin = (cb = () => {}) => {
    if (accessToken) {
      setShowRequireLoginModal(false);
      return (...args) => {
        cb(...args);
      };
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
        className="md:hover:border-action-color rounded-md border-2 relative delay-200 cursor-pointer"
        ref={ref}
        onMouseOver={() =>
          PreFetchIndiviualPost({ userId, postId, imgURL: titleImgURL })
        }
        onClick={() => {
          navigate(`post/${userId}/${postId}`);
        }}
      >
        <PostContainer className={`px-2 pt-4 pb-1`}>
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
                <h4 className="text-fs_xl text-text-primary md:hover:text-action-color font-extrabold capitalize">
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
                    const res = checkLogin(handleBookmark);
                    if (res) {
                      res(e);
                    }
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
