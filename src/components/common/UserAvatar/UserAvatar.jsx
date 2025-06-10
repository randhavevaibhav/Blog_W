import React from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";

const avatarSizeList = {
  small:{
   size: `w-[40px]`,
   fallbackSize:`40px`
  },
  medium:{
    size: `w-[50px]`,
    fallbackSize:`5s0px`
   },
  large:{
    size: `w-[90px]`,
    fallbackSize:`90px`
   }
}
export const UserAvatar = ({userProfileImg,avatarSize='medium'}) => {
  return (
    <div
  
    className=""
  >
    {!userProfileImg ? (
       <div className={`${avatarSizeList[avatarSize].size} mr-2 flex justify-center rounded-full `}>
      <IoPersonCircleSharp size={avatarSizeList[avatarSize].fallbackSize} className='p-1' />
      </div>
    ) : (
      <div className={`${avatarSizeList[avatarSize].size} mr-2`}>
        <img
          src={userProfileImg}
          alt={`user profile image`}
          className="object-cover aspect-square w-full rounded-full"
          id='profileImg'
        />
      </div>
    )}
  
  </div>
  )
}
