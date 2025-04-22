import { IoCreate, IoHomeSharp, IoLogOut } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { Input } from "../common/Input/Input";

export const SideMenuList = ({ hideSidebar, handleLogOut }) => {
  return (
    <>
      <ul
        className={`flex  flex-col gap-4 `}
        onClick={(e) => {
          hideSidebar();
        }}
      >
        <Input
          type="search"
          className="bg-bg-shade  border-none p-2"
          placeholder="Search"
        />

        <Link to={`/`} className=" text-lg  rounded-lg p-2  bg-bg-shade">
          <li className=" md:block flex items-center gap-2">
            <IoHomeSharp />
            <span> Home</span>
          </li>
        </Link>
        <Link
          to={`/dashboard`}
          className="text-lg  rounded-lg p-2  bg-bg-shade"
        >
          <li className="md:block flex items-center gap-2">
            <MdSpaceDashboard />
            <span>Dashbord</span>
          </li>
        </Link>
        <Link to={`/new`} className="text-lg  rounded-lg p-2  bg-bg-shade">
          <li className="md:block flex items-center gap-2 ">
            <IoCreate />
            <span>Create post</span>
          </li>
        </Link>
        <Link to={`/signin`} className="text-lg  rounded-lg p-2  bg-bg-shade">
          <li
            className="md:block flex items-center gap-2 "
            onClick={() => handleLogOut()}
          >
            <IoLogOut />
            <span>Log out</span>
          </li>
        </Link>
      </ul>
    </>
  );
};
