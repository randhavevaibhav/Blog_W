import { format } from "date-fns";
import { Link } from "react-router-dom";

import { FaBookmark, FaRegBookmark, FaRegHeart, FaTrash } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { formatNumber } from "@/utils/utils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { forwardRef } from "react";

const UserProfile = ({ profileImg }) => {
  return <UserAvatar userProfileImg={profileImg} avatarSize={`small`} />;
};

const PostTitle = ({ userId, postId, className, children }) => {
  const defaultClasses = `gap-2 items-center rounded-md `;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <Link
      to={`/post/${userId}/${postId}`}
      className={`${overrideClasses}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </Link>
  );
};

const PostAutherName = ({ userName }) => {
  return (
    <span className=" font-medium text-fs_small capitalize mr-2 dark:text-[#d6d6d7] text-[#a7a7a7]">
      {userName}
    </span>
  );
};

const PostPublish = ({ createdAt }) => {
  return (
    <span className="text-fs_xs text-gray-400">
      Published: {format(new Date(createdAt), "yyyy-MM-dd")}
    </span>
  );
};

const PostActions = ({ userId, postTitle, postId, className, imgURL }) => {
  const defaultClasses = `flex gap-2 justify-self-end `;
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <div className={`${overrideClasses}`}>
      <div>
        <a
          href={`/post/delete/${postTitle}/${postId}`}
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
        >
          <FaTrash className="text-[14px]" />
          Delete
        </a>
      </div>
      <div>
        <Link
          to={`/edit/${userId}/${postId}`}
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
        >
          <IoCreate />
          Edit
        </Link>
      </div>
    </div>
  );
};

const PostReactions = ({
  className = ``,
  likeCount = 0,
  totalComments = 0,
  userId,
  postId,
}) => {
  const defaultClasses = `flex gap-2 text-gray-400`;
  const overrideClasses = twMerge(defaultClasses, className);

  let likeCountFallback = likeCount;
  let totalCommentsFallback = totalComments;

  if (!likeCountFallback) {
    likeCountFallback = 0;
  }

  if (!totalCommentsFallback) {
    totalCommentsFallback = 0;
  }

  return (
    <div
      className={`${overrideClasses} dark:text-[#d6d6d7] text-[#a7a7a7] flex justify-between`}
    >
      <div className="flex gap-2">
        <Link
          className={`flex items-center gap-1`}
          to={`post/${userId}/${postId}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaRegHeart />
          <span className="text-fs_small tracking-wide flex gap-1">
            {formatNumber(likeCountFallback)}
            <span className="md:block hidden">
              {likeCountFallback > 1 ? `likes` : `like`}
            </span>
          </span>
        </Link>

        <Link
          className={`flex items-center gap-1`}
          to={`post/${userId}/${postId}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <AiOutlineMessage />
          <span className="text-fs_small tracking-wide flex gap-1">
            {formatNumber(totalCommentsFallback)}
            <span className="md:block hidden">
              {totalCommentsFallback > 1 ? ` comments` : ` comment`}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

const PostBookMark = ({ isBookmarked, handleBookmark }) => {
  return (
    <div>
      {isBookmarked ? (
        <button
          onClick={handleBookmark}
          className="py-2 px-2 pointer-events-auto"
        >
          <FaBookmark className={`cursor-pointer  text-action-color`} />
        </button>
      ) : (
        <button
          onClick={handleBookmark}
          className="py-2 px-2 pointer-events-auto"
        >
          <FaRegBookmark
            className={`cursor-pointer  md:hover:text-action-color  duration-200`}
          />
        </button>
      )}
    </div>
  );
};
const PostContainer = forwardRef(
  (
    {
      className,
      children,
      handleMouseOver = () => {},
      handleTouchStart = () => {},
    },
    ref
  ) => {
    const defaultClasses = `p-4 bg-card-bg rounded-md `;
    const overrideClasses = twMerge(defaultClasses, className);
    return (
      <>
        <div
          className={`${overrideClasses} `}
          onMouseOver={handleMouseOver}
          onTouchStart={handleTouchStart}
          ref={ref}
        >
          {children}
        </div>
      </>
    );
  }
);

PostContainer.UserProfile = UserProfile;
PostContainer.PostAutherName = PostAutherName;
PostContainer.PostTitle = PostTitle;
PostContainer.PostPublish = PostPublish;
PostContainer.PostActions = PostActions;
PostContainer.PostReactions = PostReactions;
PostContainer.PostBookMark = PostBookMark;
export default PostContainer;
