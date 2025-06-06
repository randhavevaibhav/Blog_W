import { format } from "date-fns";
import { Link } from "react-router-dom";

import { FaRegHeart, FaTrash } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { formatNumber } from "@/utils/utils";
import { setLocalStorageItem } from "@/utils/browser";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { useQueryClient } from "@tanstack/react-query";
import { forwardRef } from "react";

const UserProfile = ({ profileImg }) => {
  return <UserAvatar userProfileImg={profileImg} />;
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
    <span className=" font-medium text-fs_small capitalize mr-2">
      {userName}
    </span>
  );
};

const PostPublish = ({ createdAt }) => {
  return (
    <span className="text-fs_small text-gray-400">
      Published: {format(new Date(createdAt), "yyyy-MM-dd")}
    </span>
  );
};

const PostActions = ({
  userId,
  postTitle,
  postId,
  className,
}) => {
  const defaultClasses = `flex gap-2 justify-self-end `;
  const overrideClasses = twMerge(defaultClasses, className);

  const queryClient = useQueryClient();

  const handlePostEdit = () => {
    const getIndiviualPostQueryKey = [
      "getIndiviualPost",
      userId.toString(),
      userId.toString(),
      postId.toString(),
    ];

    const data = queryClient.getQueryData(getIndiviualPostQueryKey);
    const postData = data.postData;

    setLocalStorageItem("PostData", {
      title: postData.title,
      content: postData.content,
      imgURL: postData.title_img_url,
      isEditPostData: true,
    });
  };
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
          onClick={handlePostEdit}
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
    <div className={`${overrideClasses}`}>
      <div className={`flex items-center gap-1`}>
        <FaRegHeart className="ml-2" />
        <span className="text-fs_small">{formatNumber(likeCountFallback)}</span>
      </div>

      <div className={`flex items-center gap-1`}>
        <AiOutlineMessage className="ml-2" />
        <span className="text-fs_small">
          {formatNumber(totalCommentsFallback)}
        </span>
      </div>
    </div>
  );
};
const PostContainer = forwardRef(({
  className,
  children,
  handleMouseOver = () => {},
  handleTouchStart = () => {},
},ref) => {

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
})

PostContainer.UserProfile = UserProfile;
PostContainer.PostAutherName = PostAutherName;
PostContainer.PostTitle = PostTitle;
PostContainer.PostPublish = PostPublish;
PostContainer.PostActions = PostActions;
PostContainer.PostReactions = PostReactions;

export default PostContainer;
