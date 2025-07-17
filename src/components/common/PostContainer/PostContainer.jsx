import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaRegHeart, FaTrash } from "react-icons/fa";
import { IoCreate, IoMail } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";
import { formatNumber, getFormattedDateString } from "@/utils/utils";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FollowButton from "../FollowButton/FollowButton";
import { useAuth } from "@/hooks/auth/useAuth";

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

const PostAuthorName = forwardRef((props, ref) => {
  const { userName, ...rest } = props;
  return (
    <span
      className=" font-medium text-fs_small capitalize mr-2 dark:text-[#d6d6d7] text-[#a7a7a7]"
      {...rest}
      ref={ref}
    >
      {userName}
    </span>
  );
});

const PostPublish = ({ createdAt }) => {
  const formattedDateStr = getFormattedDateString({ createdAt });
  return (
    <span className="text-fs_xs text-gray-400">
      Published:&nbsp;&nbsp;{formattedDateStr}
    </span>
  );
};

const PostActions = ({ userId, postTitle, postId, className, imgURL }) => {
  const defaultClasses = `flex gap-2 justify-self-end `;
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <div className={`${overrideClasses}`}>
      <div>
        <Link
          to={`/post/delete/${postTitle}/${postId}`}
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaTrash className="text-[14px]" />
          Delete
        </Link>
      </div>
      <div>
        <Link
          to={`/edit/${userId}/${postId}`}
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <IoCreate />
          Edit
        </Link>
      </div>
    </div>
  );
};

export const PostAuthorNameWithAuthorInfoPopOver = ({
  userId,
  bio,
  userName,
  userProfileImg,
  userEmail,
  userLocation,
  userJoinedOn,
  isFollowed,
}) => {
  const [showPopover, setShowPopOver] = useState(false);
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const { preFetchUserInfo } = usePrefetch();
  const formattedDateStr = getFormattedDateString({
    createdAt: userJoinedOn,
  });

  const navigate = useNavigate();

  const isCurrentUser = parseInt(userId) === parseInt(currentUserId);
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
          onMouseEnter={() => setShowPopOver(true)}
          onMouseOver={() => preFetchUserInfo({ userId })}
        >
          <PostAuthorName userName={userName} />
        </PopoverTrigger>

        <PopoverContent className="w-64 p-0 md:block hidden rounded-xl">
          <Card className="bg-card-bg">
            <CardHeader
              className=" cursor-pointer p-4 pb-0 mb-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/userprofile/${userId}`);
              }}
            >
             <div className="flex gap-2 items-center mb-2">
               <UserAvatar userProfileImg={userProfileImg} />

              <h3 className="text-fs_xl text-gray-400 capitalize">
                {userName}
              </h3>
             </div>
           <div>
               {isCurrentUser ? (
                <Link
                  to={`/userprofile/edit/${userId}`}
                  className="bg-action-color  shadow hover:bg-[#6057ca]/90 md:px-4 px-4 py-5 md:h-9 h-8 font-medium inline-flex items-center justify-center rounded-md text-white w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Edit User
                </Link>
              ) : (
                <FollowButton
                  userId={userId}
                  isFollowed={isFollowed}
                  currentUserId={currentUserId}
                  className={`w-full`}
                />
              )}
           </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-4 pt-0">
              <div className="text-fs_small text-gray-400">
                <p className="capitalize text-primary font-semibold">JOINED</p>
                <p>{formattedDateStr}</p>
              </div>
              <hr />
               {bio ? (
                <div className="text-fs_small text-gray-400">
                  <p className="capitalize text-primary font-semibold">
                    Bio
                  </p>
                  <p>{bio}</p>
                </div>
              ) : null}
              {userLocation ? (
                <div className="text-fs_small text-gray-400">
                  <p className="capitalize text-primary font-semibold">
                    LOCATION
                  </p>
                  <p>{userLocation}</p>
                </div>
              ) : null}
              <div className="text-fs_small text-gray-400">
                <p className="capitalize text-primary font-semibold">MAIL</p>
                <a
                  href="mailto:testusermail@gmail.com"
                  className="flex gap-2 items-center text-gray-400"
                >
                  <IoMail />
                  {userEmail}
                </a>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
};

const PostTags = ({ tagList, className = "" }) => {
  const defaultClasses = `flex flex-wrap `;
  const overrideClasses = twMerge(defaultClasses, className);
  if (!tagList) {
    return <div></div>;
  }
  if (tagList.length <= 0) {
    return <div></div>;
  }
  const navigate = useNavigate();
  const { preFetchAllTaggedPosts } = usePrefetch();
  const { hashtagName } = useParams();

  return (
    <ul className={overrideClasses}>
      {tagList.map((hashtag) => (
        <li
          key={uuidv4()}
          className={`flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent  hover:border-tag-bg-hover duration-200`}
          style={{ "--tag-bg-hover": hashtag.color }}
        >
          <Button
            variant={`ghost`}
            className={`gap-1 hover:bg-inherit p-0  cursor-pointer h-7`}
            type={"button"}
            onClick={(e) => {
              e.stopPropagation();
              if (hashtagName) {
                if (hashtagName === hashtag.name) {
                  return;
                }
              }
              navigate(`/tag/${hashtag.id}/${hashtag.name}`);
            }}
            onMouseOver={() => {
              preFetchAllTaggedPosts({
                hashtagId: hashtag.id,
              });
            }}
          >
            <span
              style={{ color: hashtag.color }}
              className="font-semibold text-fs_lg"
            >
              #
            </span>
            {hashtag.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

const PostReactions = ({ className = ``, likes = 0, totalComments = 0 }) => {
  const defaultClasses = `flex gap-2 text-gray-400`;
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
    <div
      className={`${overrideClasses} dark:text-[#d6d6d7] text-[#a7a7a7] flex justify-between`}
    >
      <div className="flex gap-2">
        <FaRegHeart />
        <span className="text-fs_small tracking-wide flex gap-1">
          {formatNumber(likeCountFallback)}
          <span className="md:block hidden">
            {likeCountFallback > 1 ? `likes` : `like`}
          </span>
        </span>

        <AiOutlineMessage />
        <span className="text-fs_small tracking-wide flex gap-1">
          {formatNumber(totalCommentsFallback)}
          <span className="md:block hidden">
            {totalCommentsFallback > 1 ? ` comments` : ` comment`}
          </span>
        </span>
      </div>
    </div>
  );
};

const PostBookMark = ({ isBookmarked, handleBookmark }) => {
  return (
    <div>
      {isBookmarked ? (
        <button onClick={handleBookmark} className="p-1 pointer-events-auto">
          <FaBookmark
            className={`cursor-pointer  text-action-color`}
            size={"18px"}
          />
        </button>
      ) : (
        <button onClick={handleBookmark} className="p-1 pointer-events-auto">
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
  const defaultClasses = `p-4 bg-card-bg rounded-md flex flex-col `;
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
  const defaultClasses = `flex flex-col md:pl-10`;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <div className={overrideClasses} ref={ref} {...rest}>
      {children}
    </div>
  );
});

const PostArticle = forwardRef(
  ({ children, userId, postId, titleImgURL }, ref) => {
    const navigate = useNavigate();
    const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();
    return (
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
        {children}
      </article>
    );
  }
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
PostArticle.PostAuthorNameWithAuthorInfoPopOver =
  PostAuthorNameWithAuthorInfoPopOver;

export default PostArticle;
