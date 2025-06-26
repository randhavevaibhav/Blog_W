import { IoCreate, IoHomeSharp, IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBookmark, FaUser } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

const SideMenuNavItem = ({
  to = "",
  className = "",
  title,
  handleOnClick = () => {},
  icon = <IoHomeSharp />,
}) => {
  const defaultClasses = "text-fs_lg rounded-lg p-2 ";
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <Link to={to} className={overrideClasses} onClick={handleOnClick}>
      <li className=" md:block flex items-center gap-4">
        {icon}
        <span className="font-medium"> {title}</span>
      </li>
    </Link>
  );
};

export const SideMenuList = ({
  hideSidebar,
  handleLogOut,
  userEmailName,
  userId,
}) => {
  const sideMenuNavItemList = [
    {
      to: "/",
      title: "Home",
      icon: <IoHomeSharp size={'20px'}/>,
    },
    {
      to: "/dashboard",
      title: "Dashboard",
      icon: <MdSpaceDashboard size={'20px'}/>,
    },
    {
      to: "/new",
      title: "Create post",
      icon: <IoCreate size={'20px'}/>,
    },
    {
      to: `/userprofile/edit/${userId}`,
      title: `Edit profile`,
      icon: <FaUser size={'20px'}/>,
    },
    {
      to: "/bookmark",
      title: "Bookmarks",
      icon: <FaBookmark size={'20px'}/>,
    },
 
  ];

  return (
    <>
     
        <ul
        className={`flex flex-col gap-4 `}
        onClick={(e) => {
          hideSidebar();
        }}
      >
        {sideMenuNavItemList.map((item) => {
          return (
            <SideMenuNavItem
              to={item.to}
              title={item.title}
              icon={item.icon}
              key={uuidv4()}
            />
          );
        })}

     
      </ul>

         <Link
          to={`/signin`}
          className="text-fs_lg  rounded-lg p-2  bg-bg-shade  mt-10"
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
