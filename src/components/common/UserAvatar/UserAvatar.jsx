import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'

const avatarSizeList = {
  small:{
   size: `w-[30px]`,
   fallbackSize:`30px`
  },
  medium:{
    size: `w-[50px]`,
    fallbackSize:`50px`
   },
  large:{
    size: `w-[100px]`,
    fallbackSize:`100px`
   }
}
export const UserAvatar = ({userProfileImg,avatarSize='medium'}) => {
  return (
    <div
  
    className="flex items-center"
  >
    {!userProfileImg ? (
       <div className={`${avatarSizeList[avatarSize].size} mr-2 flex justify-center rounded-full bg-bg-shade`}>
      <BsFillPersonFill size={avatarSizeList[avatarSize].fallbackSize} className='p-1' />
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
