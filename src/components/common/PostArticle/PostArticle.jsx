import { Link, useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { formatNumber, getFormattedDateString } from "@/utils/utils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { forwardRef, useState } from "react";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { UserInfoCard } from "../UserInfoCard/UserInfoCard";
import { PostTags } from "../PostTags/PostTags";
import { Button } from "@/components/ui/button";
import {
  getDeletePostPageLink,
  getEditPostPageLink,
  getPostPageLink,
} from "@/utils/getLinks";
import { usePrefetchOnHover } from "@/hooks/utils/usePrefetchOnHover";

const UserProfile = ({ profileImg }) => {
  return <UserAvatar userProfileImg={profileImg} avatarSize={`small`} />;
};

const PostTitle = ({ postId, className, children, title = "" }) => {
  const defaultClasses = `gap-2 items-center rounded-md leading-snug`;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <Link
      to={getPostPageLink({
        postId,
      })}
      className={`${overrideClasses}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      id="post-title"
      data-test={`post-title`}
      data-value={title}
    >
      {children}
    </Link>
  );
};

const PostAuthorName = forwardRef((props, ref) => {
  const { userName, ...rest } = props;
  return (
    <span
      className=" font-medium text-fs_small capitalize mr-2 text-text-fade"
      {...rest}
      ref={ref}
    >
      {userName}
    </span>
  );
});

const PostPublish = ({ createdAt }) => {
  const formattedDateStr = getFormattedDateString({ date:createdAt });
  return (
    <span className="text-fs_xs text-text-fade">
      Published:&nbsp;&nbsp;{formattedDateStr}
    </span>
  );
};

const PostActions = ({ postTitle, postId, className }) => {
  const defaultClasses = `flex gap-2 justify-self-end `;
  const overrideClasses = twMerge(defaultClasses, className);
  const navigate = useNavigate();
  const { preFetchAllHashtags } = usePrefetch();

  return (
    <div className={`${overrideClasses}`}>
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              getEditPostPageLink({
                postId,
              }),
            );
          }}
          onMouseOver={() => {
            preFetchAllHashtags();
          }}
          variant={`ghost`}
          className={`underline md:no-underline underline-offset-4 tracking-wider md:hover:bg-action-color md:hover:text-white md:h-9 h-8 md:px-4 px-3 text-text-fade font-normal`}
          data-test={`edit-post-button`}
        >
          Edit
        </Button>
      </div>
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              getDeletePostPageLink({
                postTitle,
                postId,
              }),
            );
          }}
          variant={`ghost`}
          className={`underline md:no-underline underline-offset-4 md:hover:bg-red-500 md:hover:text-white tracking-wider md:h-9 h-8 md:px-4 px-3 text-text-fade font-normal`}
          data-test={`delete-post-button`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export const UserInfoPopOver = ({ userId, firstName }) => {
  const [showPopover, setShowPopOver] = useState(false);
  const [queryEnable, setQueryEnable] = useState(false);
  let timer = null;

  const handleOpenChange = (value) => {
    clearTimeout(timer);
    if (value) {
      timer = setTimeout(() => setShowPopOver(true), 800);
    } else {
      timer = setTimeout(() => setShowPopOver(false), 400);
    }
  };
  return (
    <>
      <Popover
        open={showPopover}
        onOpenChange={(open) => {
          setShowPopOver(open);
        }}
      >
        <PopoverTrigger
          asChild
          onMouseEnter={() => handleOpenChange(true)}
          onMouseOver={() => handleOpenChange(true)}
        >
          <PostAuthorName userName={firstName} />
        </PopoverTrigger>

        <PopoverContent
          className="w-[256px] p-0 md:block hidden rounded-xl"
          onMouseLeave={() => handleOpenChange(false)}
          sideOffset={-18}
        >
          <UserInfoCard queryEnable={queryEnable} userId={userId} />
        </PopoverContent>
      </Popover>
    </>
  );
};

const PostReactions = ({ className = ``, likes = 0, totalComments = 0 }) => {
  const defaultClasses = `flex gap-2`;
  const overrideClasses = twMerge(defaultClasses, className);

  let likeCountFallback = likes;
  let totalCommentsFallback = totalComments;

  if (!likeCountFallback) {
    likeCountFallback = 0;
  }

  if (!totalCommentsFallback) {
    totalCommentsFallback = 0;
  }

  return (
    <div className={`${overrideClasses} text-text-fade flex justify-between`}>
      <div className="flex gap-6 ">
        <div className="flex gap-2">
          <FaRegHeart />
          <span className="text-fs_small  tracking-wide flex gap-1">
            {formatNumber(likeCountFallback)}
            <span className="md:block hidden">
              {likeCountFallback > 1 ? `likes` : `like`}
            </span>
          </span>
        </div>

        <div className="flex gap-2">
          <AiOutlineMessage />
          <span className="text-fs_small tracking-wide flex gap-1">
            {formatNumber(totalCommentsFallback)}
            <span className="md:block hidden">
              {totalCommentsFallback > 1 ? ` comments` : ` comment`}
            </span>
          </span>
        </div>
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
          className="p-1 pointer-events-auto"
          data-test={`bookmark`}
          id={"bookmark"}
        >
          <FaBookmark
            className={`cursor-pointer  text-action-color`}
            size={"18px"}
          />
        </button>
      ) : (
        <button
          onClick={handleBookmark}
          className="p-1 pointer-events-auto"
          data-test={`bookmark`}
          id={"bookmark"}
        >
          <FaRegBookmark
            className={`cursor-pointer  md:hover:text-action-color  duration-100`}
            size={"18px"}
          />
        </button>
      )}
    </div>
  );
};
const Wrapper = forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const defaultClasses = `px-4 pt-4 bg-card-bg rounded-md flex flex-col `;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <div className={`${overrideClasses} `} {...rest} ref={ref}>
        {children}
      </div>
    </>
  );
});

const Header = ({ children }) => {
  return <div className="flex">{children}</div>;
};

const Author = ({ children }) => {
  return <div className="flex flex-col">{children}</div>;
};

const Body = forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const defaultClasses = `space-y-3 md:pl-14`;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div className={overrideClasses} ref={ref} {...rest}>
      {children}
    </div>
  );
});

const PostArticle = forwardRef(
  (
    {
      children,
      userId,
      postId,
      titleImgURL,
      isBookmarked = false,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const { preFetchIndividualPost, preFetchPostComments, preFetchUserInfo } =
      usePrefetch();

    const { onMouseEnter, onMouseLeave } = usePrefetchOnHover({
      prefFetchQueryFn: () => {
        preFetchIndividualPost({ postId, imgURL: titleImgURL });
        preFetchPostComments({
          postId,
        });
        preFetchUserInfo({ userId });
      },
    });

    return (
      <article
        className="rounded-md cursor-pointer"
        id={`post_${postId}`}
        data-bookmark={isBookmarked}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => {
          navigate(
            getPostPageLink({
              postId,
            }),
          );
        }}
        data-test={`post-article`}
      >
        {children}
      </article>
    );
  },
);

PostArticle.UserProfile = UserProfile;
PostArticle.PostAuthorName = PostAuthorName;
PostArticle.PostTitle = PostTitle;
PostArticle.PostPublish = PostPublish;
PostArticle.PostActions = PostActions;
PostArticle.PostReactions = PostReactions;
PostArticle.PostTags = PostTags;
PostArticle.PostBookMark = PostBookMark;
PostArticle.Header = Header;
PostArticle.Author = Author;
PostArticle.Body = Body;
PostArticle.Wrapper = Wrapper;
PostArticle.UserInfoPopOver = UserInfoPopOver;

export default PostArticle;
