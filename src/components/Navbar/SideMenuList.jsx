import { IoCreate, IoHomeSharp, IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaBookmark, FaUser } from "react-icons/fa";
export const SideMenuList = ({ hideSidebar, handleLogOut,userEmailName,userId }) => {
  return (
    <>
      <ul
        className={`flex  flex-col gap-4 `}
        onClick={(e) => {
          hideSidebar();
        }}
      >
        <Link to={`/`} className="text-fs_lg rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white">
          <li className=" md:block flex items-center gap-2">
            <IoHomeSharp />
            <span className="font-medium"> Home</span>
          </li>
        </Link>
        <Link
          to={`/dashboard`}
          className="text-fs_lg  rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white"
        >
          <li className="md:block flex items-center gap-2">
            <MdSpaceDashboard />
            <span  className="font-medium">Dashbord</span>
          </li>
        </Link>
        <Link to={`/new`} className="text-fs_lg  rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white">
          <li className="md:block flex items-center gap-2 ">
            <IoCreate />
            <span  className="font-medium">Create post</span>
          </li>
        </Link>
        <Link to={`/userprofile/edit/${userId}`} className="text-fs_lg  rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white">
        <li className="md:block flex items-center gap-2">
        <FaUser />

          <span  className="font-medium">Edit user</span>
        </li>
      </Link>
       <Link to={`/bookmark`} className="text-fs_lg  rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white">
        <li className="md:block flex items-center gap-2">
        <FaBookmark />

          <span  className="font-medium">Bookmark</span>
        </li>
      </Link>
        <Link to={`/signin`} className="text-fs_lg  rounded-lg p-2  bg-bg-shade hover:bg-action-color hover:text-white">
          <li
            className="md:block flex items-center gap-2 "
            onClick={() => handleLogOut()}
          >
            <IoLogOut />
            <span  className="font-medium">Log out</span>
          </li>
        </Link>
      </ul>
    </>
  );
};
