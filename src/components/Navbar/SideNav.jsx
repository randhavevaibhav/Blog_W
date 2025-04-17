import { Input } from "../common/Input/Input";
import { useAuth } from "../../hooks/auth/useAuth";
import { Link } from "react-router-dom";

import { MdSpaceDashboard } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { SideMenuList } from "./SideMenuList";
import { useLogout } from "../../hooks/auth/useLogout";
import { IoHomeSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
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
  const { userName, userMail, userProfileImg } = auth;
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
              <div className="brand grid grid-cols-[50px_1fr] items-center">
                <div className="logo">
                  <Link to="/" onClick={() => hideSidebar()}>
                    <FaBlog size={"25px"} />
                  </Link>
                </div>
                <Link
                  to={`/user/${userMail}`}
                  onClick={() => hideSidebar()}
                  className="flex items-center"
                >
                  {!userProfileImg ? (
                    <BsFillPersonFill size={"80px"} className="mr-2" />
                  ) : (
                    <div className="w-[80px] mr-2">
                      <img
                        src={userProfileImg}
                        alt={`user profile image`}
                        className="object-cover aspect-square w-full rounded-full"
                      />
                    </div>
                  )}
                  <div className="user_info flex flex-col p-4 gap-2">
                    <span className="text-2xl font-bold">{userName}</span>
                    <span className="text-sm">{userMail}</span>
                  </div>
                  <hr />
                </Link>
              </div>
              <Input
                type="search"
                className="bg-bg-shade  border-none p-2"
                placeholder="Search"
              />
            </>
          ) : (
            <div className="logo mb-4">
              <Link to="/" onClick={() => hideSidebar()}>
                <FaBlog size={"25px"} />
              </Link>
            </div>
          )}

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
