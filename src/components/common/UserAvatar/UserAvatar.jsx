import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const avatarSizeList = {
  xSmall:{
 size: `w-[25px]`,
    fallbackSize: `25px`,
  },
  small: {
    size: `w-[40px]`,
    fallbackSize: `40px`,
  },
  medium: {
    size: `w-[60px]`,
    fallbackSize: `60px`,
  },
  large: {
    size: `w-[90px]`,
    fallbackSize: `90px`,
  },
};

const defaultClasses=`mr-2 flex justify-center rounded-full`
export const UserAvatar = (props) => {
  const { userProfileImg, avatarSize = "medium" ,className="",...rest} = props;
   const overrideClasses = twMerge(defaultClasses, className);
  return (
    
      !userProfileImg ? (
        <div
          className={`${avatarSizeList[avatarSize].size} ${overrideClasses}`}
          {...rest}
        >
          <IoPersonCircleSharp
            size={avatarSizeList[avatarSize].fallbackSize}
            className="p-1"
          />
        </div>
      ) : (
        <div className={`${avatarSizeList[avatarSize].size} ${overrideClasses}`} {...rest}>
          <img
            src={userProfileImg}
            alt={`user profile image`}
            className="object-cover aspect-square w-full rounded-full"
            id="profileImg"
            loading="eager"
          />
        </div>
      )
    
  );
};
