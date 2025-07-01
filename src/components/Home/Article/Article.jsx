import { forwardRef, useState } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link, useNavigate } from "react-router-dom";

import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { RecentCommentsList } from "./RecentCommentsList/RecentCommentsList";
import { useCreateBookmark } from "@/hooks/bookmark/useCreateBookmark";
import { useRemoveBookmark } from "@/hooks/bookmark/useRemoveBookmark";
import { useAuth } from "@/hooks/auth/useAuth";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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
      cb();
    } else {
      setShowRequireLoginModal(true);
      return;
    }
  };

  return (
    <>
      {showRequireLoginModal ? (
        <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
      ) : null}
      <article
        className="md:hover:border-action-color rounded-md border-2 relative delay-200"
        ref={ref}
        onMouseOver={() =>
          PreFetchIndiviualPost({ userId, postId, imgURL: titleImgURL })
        }
      >
        <PostContainer className={`px-2 pt-4 pb-1`}>
          <div className="flex items-start mb-2">
            <Link
              className="pointer-events-auto"
              to={`/userprofile/${userId}`}
              onMouseOver={() => preFetchUserInfo({ userId })}
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
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
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
                <div>
                  {isBookmarked ? (
                    <button
                      onClick={(e) => {
                        checkLogin(() => handleBookmark(e));
                      }}
                      className="py-2 px-2 pointer-events-auto"
                    >
                      <FaBookmark
                        className={`cursor-pointer  text-action-color`}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        checkLogin(() => handleBookmark(e));
                      }}
                      className="py-2 px-2 pointer-events-auto"
                    >
                      <FaRegBookmark
                        className={`cursor-pointer  md:hover:text-action-color  duration-200`}
                      />
                    </button>
                  )}
                </div>
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
