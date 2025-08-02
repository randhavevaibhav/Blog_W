import { IoCreate, IoHomeSharp, IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FaBookmark, FaUser } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { UserAvatar } from "../../common/UserAvatar/UserAvatar";
import { useState } from "react";

const SideMenuNavItem = (props) => {
  const {
    to = "",
    className = "",
    title,
    handleOnClick = () => {},
    icon = <IoHomeSharp />,
    ...rest
  } = props;

  const defaultClasses = "text-fs_lg rounded-lg p-2 ";
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <Link to={to} className={overrideClasses} onClick={handleOnClick} {...rest}>
      <li className=" md:block flex items-center gap-4">
        {icon}
        <span className="font-medium"> {title}</span>
      </li>
    </Link>
  );
};

export const SideNavMenuList = ({
  hideSidebar,
  handleLogOut,
  userId,
  userProfileImg,
  userName,
  userMail,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const sideMenuNavItemList = [
    {
      to: "/",
      title: "Home",
      icon: <IoHomeSharp size={"20px"} />,
    },
    {
      to: "/dashboard",
      title: "Dashboard",
      icon: <MdSpaceDashboard size={"20px"} />,
    },
    {
      to: "/new",
      title: "Create post",
      icon: <IoCreate size={"20px"} />,
    },
    {
      to: `/userprofile/edit/${userId}`,
      title: `Edit profile`,
      icon: <FaUser size={"20px"} />,
    },
    {
      to: "/bookmark",
      title: "Bookmarks",
      icon: <FaBookmark size={"20px"} />,
    },
     {
      to: `/user/${userId}/followers`,
      title: "Followers",
      icon: <FaUserFriends size={"20px"} />,
    },
     {
      to: `/user/${userId}/followings`,
      title: "Following users",
      icon: <FaUserFriends size={"20px"} />,
    },
  ];

  return (
    <>
      <Link
        className="brand flex items-center my-2  rounded-md "
        to={`/userprofile/${userId}`}
        onClick={() => {
          hideSidebar();
          setSelectedItem(null);
        }}
      >
        <UserAvatar userProfileImg={userProfileImg} />

        <div className="user_info flex flex-col p-2 gap-2">
          <span className="text-fs_xl font-bold">{userName}</span>
          <span className="text-fs_small">{userMail}</span>
        </div>
      </Link>

      <ul
        className={`flex flex-col gap-4 `}
        onClick={(e) => {
          hideSidebar();
        }}
      >
        {sideMenuNavItemList.map((item, i) => {
          return (
            <SideMenuNavItem
              to={item.to}
              title={item.title}
              icon={item.icon}
              key={uuidv4()}
              className={`${
                i === selectedItem ? `bg-action-color text-white` : ``
              }`}
              onClick={() => {
                setSelectedItem(i);
              }}
            />
          );
        })}
      </ul>

      <Link
        to={`/signin`}
        className="text-fs_lg  rounded-lg p-2  bg-bg-shade  mt-6"
      >
        <li
          className="md:block flex items-center gap-2 "
          onClick={() => handleLogOut()}
        >
          <IoLogOut />
          <span className="font-medium">Log out</span>
        </li>
      </Link>
    </>
  );
};
