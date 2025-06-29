import { format } from "date-fns";
import { Link } from "react-router-dom";

import { FaRegHeart, FaTrash } from "react-icons/fa";
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
    <Link to={`/post/${userId}/${postId}`} className={`${overrideClasses}`}>
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
    <div className={`${overrideClasses} dark:text-[#d6d6d7] text-[#a7a7a7]`}>
      <div className={`flex items-center gap-1`}>
        <FaRegHeart />
        <span className="text-fs_small">{formatNumber(likeCountFallback)}</span>
      </div>

      <div className={`flex items-center gap-1`}>
        <AiOutlineMessage />
        <span className="text-fs_small">
          {formatNumber(totalCommentsFallback)}
        </span>
      </div>
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
    const defaultClasses = `p-4 bg-bg-shade hover:bg-bg-shade-hover rounded-md `;
    const overrideClasses = twMerge(defaultClasses, className);
    return (
      <>
        <div
          className={`${overrideClasses}`}
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

export default PostContainer;
