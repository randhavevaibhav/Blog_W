import { format } from 'date-fns'
import React from 'react'
import { FaBirthdayCake } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {UserAvatar} from "../common/UserAvatar/UserAvatar"
export const Header = ({userEmailName,userName,userMail,joinedOn,userProfileImg}) => {
  return (
    <div className="header p-4 ">
        <header className="p-4 bg-bg-shade rounded-md">
          <div className="flex justify-end">
            <Link to={`/edit/${userEmailName}`}>Edit User</Link>
          </div>
          <div className="text-center user_details flex flex-col gap-2 mb-4 items-center">
            <UserAvatar userProfileImg={userProfileImg} avatarSize='large'/>
            
            <h2 className="text-fs_3xl">{userName}</h2>
            <p className="text-fs_base">A fullstack sofware engineer</p>
          </div>

          <div className="meta text-sm flex md:gap-6 gap-2 md:justify-center flex-col items-center md:items-start md:flex-row">
            <span className="flex gap-2 items-center text-gray-400 text-fs_small">
              <FaBirthdayCake />
              {`Joined on ${format(new Date(joinedOn), "yyyy-MM-dd")}`}
            </span>
            <a
              href="mailto:testusermail@gmail.com"
              className="flex gap-2 items-center text-gray-400"
            >
              <IoMail />
              {userMail}
            </a>
          </div>
        </header>
      </div>
  )
}
