import { useAuth } from "@/hooks/auth/useAuth";
import { useGetUserInfo } from "@/hooks/user/useGetUserInfo";
import React, { createContext, memo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorText } from "../ErrorText/ErrorText";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { FollowButton } from "../FollowButton/FollowButton";
import { IoMail } from "react-icons/io5";
import { getFormattedDateString } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getUpdateUserPageLink,
  getUserProfilePageLink,
} from "@/utils/getLinks";
import { FaBirthdayCake } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { FaUserEdit } from "react-icons/fa";

const UserInfoCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col space-y-3 p-1 pb-10">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-[50px] w-[50px] rounded-full bg-skeleton-bg flex-none" />
          <Skeleton className="h-10 max-w-[280px] rounded-xl bg-skeleton-bg w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 max-w-[340px] bg-skeleton-bg" />
          <Skeleton className="h-4 max-w-[340px] bg-skeleton-bg" />
          <Skeleton className="h-4 max-w-[340px] bg-skeleton-bg" />
        </div>
      </div>
    </>
  );
};

const userInfoCardContext = createContext(null);

const UserInfoCardProvider = ({ children, queryEnable = true, userId }) => {
  const { auth } = useAuth();
  const { userId: currentUserId } = auth;
  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useGetUserInfo({ userId, currentUserId, queryEnable });
  const userInfo = userData?.userInfo;
  const isCurrentUser = parseInt(userId) === parseInt(currentUserId);

  return (
    <userInfoCardContext.Provider
      value={{
        userInfo,
        isPending,
        isError,
        error,
        currentUserId,
        userId,
        isCurrentUser,
      }}
    >
      {children}
    </userInfoCardContext.Provider>
  );
};

const useUserInfoCardContext = () => {
  const contextValue = useContext(userInfoCardContext);
  if (!contextValue) {
    throw new Error(
      "Please use userInfoCardContext inside userInfoCardContext.Provider",
    );
  }
  return contextValue;
};

const CardWrapper = (props) => {
  const { className = "", children, ...rest } = props;
  const { isPending, isError, error } = useUserInfoCardContext();

  if (isPending) {
    return <UserInfoCardSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <ErrorText>Error while fetching userInfo !</ErrorText>;
  }

  return (
    <Card className={cn("bg-card-bg md:block hidden relative max-lg:max-w-[500px]", className)} {...rest}>
      {children}
    </Card>
  );
};



const UserAvatarContainer = (props) => {
  const { className, ...rest } = props;
  const {
    userInfo: { profileImgURL, firstName,email },
  } = useUserInfoCardContext();
  
  const [emailUserName,emailDomainName] = email.split("@");

  return (
    <div className={cn("flex gap-1 items-center mb-2", className)} {...rest}>
      <UserAvatar userProfileImg={profileImgURL} />

     <div className="flex flex-col min-w-0">
       <h3 className="text-fs_xl text-gray-400 capitalize">{firstName}</h3>
       <a
        href={`mailto:${email}`}
        className="flex gap-1 items-center text-gray-400 truncate text-fs_small " 
      >
        <IoMail className="flex-none"/> 
       <div className="min-w-0 flex">
         <span className="truncate inline-block">{emailUserName}</span>
        <span className="flex-none">{`@`+emailDomainName}</span>
       </div>
      </a>
     </div>
      
    </div>
  );
};

const EditUserLink = (props) => {
  const { isCurrentUser } = useUserInfoCardContext();
  const { className, ...rest } = props;
  if (!isCurrentUser) {
    return null;
  }
  return (
    <Link
      to={getUpdateUserPageLink()}
      className={cn(
        "absolute right-4 lg:hover:text-action-color lg:text-primary text-action-color",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-test={"edit-user-btn"}
      {...rest}
    >
      <FaUserEdit size={"18px"}/>
    </Link>
  );
};

const Header = (props) => {
  const { className = "", children, ...rest } = props;
  const {
    userId,
  } = useUserInfoCardContext();
  const navigate = useNavigate();

  return (
    <CardHeader
      className={cn("cursor-pointer p-4 pb-0 mb-4", className)}
      onClick={(e) => {
        e.stopPropagation();
        navigate(
          getUserProfilePageLink({
            userId,
          }),
        );
      }}
      data-test={`user-info-card-header`}
      {...rest}
    >
      {children}
    </CardHeader>
  );
};

const ContentWrapper = (props) => {
  const { className = "", children, ...rest } = props;
  return (
    <CardContent
      className={cn("flex flex-col gap-2 p-4 pt-0", className)}
      {...rest}
    >
      {children}
    </CardContent>
  );
};

const JoinedOn = (props) => {
  const { className = "",justifyIcon="normal", ...rest } = props;
  const {
    userInfo: { registeredAt },
  } = useUserInfoCardContext();
  const formattedDateStr = getFormattedDateString({
    date: registeredAt,
  });

  

  return (
    <div className={cn("text-fs_small text-gray-400 ", className)} {...rest}>
      <p className="capitalize text-fs_small text-primary font-semibold">Joined</p>
      <div className={cn("flex gap-1 items-start",{
        "justify-center":justifyIcon==="center",
        "justify-normal":justifyIcon==="normal",
        "justify-end":justifyIcon==="end"
      })}>
        <FaBirthdayCake className="flex-none" />
        <p className="text-fs_small">{formattedDateStr}</p>
      </div>
    </div>
  );
};


const Location = (props) => {
  const { className = "",justifyIcon="normal", ...rest } = props;
  const {
    userInfo: { location },
  } = useUserInfoCardContext();
  if (!location) {
    return null;
  }
  return (
    <div className={cn("text-fs_small text-gray-400",className)} {...rest}>
      <p className="capitalize text-fs_small text-primary font-semibold ">Location</p>
      <div className={cn("flex gap-1 items-center",{
         "justify-center":justifyIcon==="center",
        "justify-normal":justifyIcon==="normal",
        "justify-end":justifyIcon==="end"
      })}>
        <FaLocationDot size={"12px"} className="flex-none"/>
        <p className="text-fs_small truncate">{location}</p>
      </div>
    </div>
  );
};


const TotalFollowers = () => {
  const {
    userInfo: { totalUserFollowers },
  } = useUserInfoCardContext();
  return (
    <div className="flex flex-col  text-fs_small text-gray-400 text-center">
      <p className="capitalize text-primary font-semibold">Followers</p>

      <p>{totalUserFollowers}</p>
    </div>
  );
};

const TotalFollowingUsers = () => {
  const {
    userInfo: { totalUserFollowings },
  } = useUserInfoCardContext();
  return (
    <div className=" flex flex-col  text-fs_small text-gray-400 text-center">
      <p className="capitalize text-primary font-semibold">Following users</p>

      <p>{totalUserFollowings}</p>
    </div>
  );
};

const TotalPosts = () => {
  const {
    userInfo: { totalUserPosts },
  } = useUserInfoCardContext();
  return (
    <div className="flex flex-col  text-fs_small text-gray-400 text-center">
      <p className="capitalize text-primary font-semibold">Total Posts</p>

      <p>{totalUserPosts}</p>
    </div>
  );
};

const TotalComments = () => {
  const {
    userInfo: { totalUserComments },
  } = useUserInfoCardContext();
  return (
    <div className="flex flex-col  text-fs_small text-gray-400 text-center">
      <p className="capitalize text-primary font-semibold">Total Comments</p>
      <p>{totalUserComments}</p>
    </div>
  );
};

const UserAnalytics = (props) => {
  const { className = "", ...rest } = props;
  return (
    <div className={cn("grid grid-cols-2 gap-2  ", className)} {...rest}>
      <CompUserInfoCard.TotalFollowers />
      <CompUserInfoCard.TotalFollowingUsers />
      <CompUserInfoCard.TotalPosts />
      <CompUserInfoCard.TotalComments />
    </div>
  );
};

export const CompUserInfoCard = ({ children, userId, queryEnable = true }) => {
  return (
    <UserInfoCardProvider userId={userId} queryEnable={queryEnable}>
      {children}
    </UserInfoCardProvider>
  );
};

const FollowButtonContainer = () => {
  const {
    userInfo: { isFollowed },
    userId,
  } = useUserInfoCardContext();
  return (
    <FollowButton
      userId={userId}
      isFollowed={isFollowed}
      className={`w-full`}
    />
  );
};

CompUserInfoCard.CardWrapper = CardWrapper;
CompUserInfoCard.ContentWrapper = ContentWrapper;
CompUserInfoCard.Header = Header;
CompUserInfoCard.JoinedOn = JoinedOn;
CompUserInfoCard.Location = Location;
CompUserInfoCard.TotalFollowers = TotalFollowers;
CompUserInfoCard.TotalFollowingUsers = TotalFollowingUsers;
CompUserInfoCard.TotalPosts = TotalPosts;
CompUserInfoCard.TotalComments = TotalComments;
CompUserInfoCard.UserAnalytics = UserAnalytics;
CompUserInfoCard.UserAvatarContainer = UserAvatarContainer;
CompUserInfoCard.EditUserLink = EditUserLink;
CompUserInfoCard.FollowButtonContainer = FollowButtonContainer;

export const UserInfoCard = memo(({ userId, queryEnable = true }) => {
  return (
    <CompUserInfoCard userId={userId} queryEnable={queryEnable}>
      <CompUserInfoCard.CardWrapper>
        <CompUserInfoCard.Header>
          <CompUserInfoCard.UserAvatarContainer />
          <CompUserInfoCard.EditUserLink />
          <CompUserInfoCard.FollowButtonContainer />
        </CompUserInfoCard.Header>
        <CompUserInfoCard.ContentWrapper>
          <CompUserInfoCard.JoinedOn />
          <CompUserInfoCard.Location />
        </CompUserInfoCard.ContentWrapper>
      </CompUserInfoCard.CardWrapper>
    </CompUserInfoCard>
  );
});
