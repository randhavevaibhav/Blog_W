import { Input } from "../common/Input/Input";
import { useAuth } from "../../hooks/auth/useAuth";
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

export const SideNav = ({ showSidebar, hideSidebar }) => {
  const { auth, setPersist } = useAuth();
  const logout = useLogout();
  const {userName,userMail} = auth;
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
              <Link to={`/user/${userMail}`} onClick={()=>hideSidebar()}>
                <div className="user_info flex flex-col p-4 gap-2">
                  <span className="text-2xl font-bold">{userName}</span>
                  <span className="text-sm">{userMail}</span>
                </div>
                <hr />
              </Link>
              <Input
                type="search"
                className="bg-bg-shade  border-none p-2"
                placeholder="Search"
              />
            </>
          ) : null}

          <SideMenuList
            list={NavMenuData}
            handleLogOut={handleLogOut}
            hideSidebar={hideSidebar}
          />
        </div>
      </nav>
    </>
  );
};
