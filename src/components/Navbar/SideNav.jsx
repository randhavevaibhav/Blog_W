import { Input } from "../common/Input/Input";
import { useAuth } from "../../hooks/auth/useAuth";
import { localUserMail, localUserName } from "../../utils/constants";
import { getLocalStorageItem } from "../../utils/browser";
import { Link } from "react-router-dom";

import { MdSpaceDashboard } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { SideMenuList } from "./SideMenuList";
import { useLogout } from "../../hooks/auth/useLogout";
import { IoHomeSharp } from "react-icons/io5";
export const authNavMenuData = [
  {
    id: 1,
    node: "Home",
    linkTo: "/",
    icon: <IoHomeSharp />,
  },
  {
    id: 2,
    node: "Dashbord",
    linkTo: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 3,
    node: "Create post",
    linkTo: "/new",
    icon: <IoCreate />,
  },
  {
    id: 4,
    node: "Log out",
    linkTo: "/signin",
    icon: <IoLogOut />,
  },
];

export const unAuthNavMenuData = [
  {
    id: 1,
    node: "Sign in",
    linkTo: "/signin",
  },
  {
    id: 2,
    node: "Sign up",
    linkTo: "/signup",
  },
];

export const SideNav = ({ showSidebar, handleShowSidebar }) => {
  const { auth, setPersist } = useAuth();
  const logout = useLogout();
  const userName = getLocalStorageItem(localUserName);
  const userMail = getLocalStorageItem(localUserMail);
  const NavMenuData = auth.accessToken ? authNavMenuData : unAuthNavMenuData;

  const handleLogOut = async (node) => {
    if (node === "Log out") {
      setPersist(false);
      localStorage.clear();
      await logout();
    }
  };
  return (
    <>
      {/* Mobile nav */}
      <nav
        className={`md:hidden  bg-bg-primary text-text-primary fixed  top-[var(--header-height)] inset-0 z-nav duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 flex flex-col gap-4">
          {auth.userId ? (
            <>
              <Link to={`/`}>
                <div className="user_info flex flex-col p-4 gap-2">
                  <span className="text-2xl font-bold">{userName}</span>
                  <span className="text-sm">{userMail}</span>
                </div>
                <hr />
              </Link>
              <Input
                type="search"
                className="dark:bg-[#efefef] bg-gray-200  border-none "
              />
            </>
          ) : null}

          <SideMenuList
            list={NavMenuData}
            handleLogOut={handleLogOut}
            handleShowSidebar={handleShowSidebar}
          />
        </div>
      </nav>
    </>
  );
};
