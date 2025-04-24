import { useAuth } from "../../hooks/auth/useAuth";
import { Link } from "react-router-dom";

import { SideMenuList } from "./SideMenuList";
import { useLogout } from "../../hooks/auth/useLogout";

import { SiteLogo } from "./SiteLogo";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";

const UnAuthSideMenuList = ({ hideSidebar }) => {
  return (
    <ul className="flex flex-col gap-4" onClick={() => hideSidebar()}>
      <li className="px-2">
        <Link
          to={`/signup`}
          className=" md:block flex items-center gap-2 text-fs_lg p-2 rounded-lg   bg-bg-shade"
        >
          <span>Signup</span>
        </Link>
      </li>
      <li className="px-2">
        <Link
          to={`/signin`}
          className=" md:block flex items-center gap-2 text-fs_lg p-2 rounded-lg   bg-bg-shade"
        >
          <span>Signin</span>
        </Link>
      </li>
    </ul>
  );
};

export const SideNav = ({ showSidebar, hideSidebar }) => {
  const { auth, setPersist } = useAuth();
  const logout = useLogout();
  const { userName, userMail, userProfileImg } = auth;

  const handleLogOut = async (node) => {
    setPersist(false);
    localStorage.clear();
    await logout();
    hideSidebar();
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
          <Link to={`/`} onClick={hideSidebar}>
            <SiteLogo />
          </Link>

          {auth.userId ? (
            <>
              <Link
                className="brand grid grid-cols-[80px_1fr] items-center"
                to={`/user/${userMail}`}
                onClick={hideSidebar}
              >
                <UserAvatar userProfileImg={userProfileImg} avatarSize={`large`}/>

                <div className="user_info flex flex-col p-4 gap-2">
                  <span className="text-fs_xl font-bold">{userName}</span>
                  <span className="text-fs_small">{userMail}</span>
                </div>
              </Link>

              <hr />

              <SideMenuList
                handleLogOut={handleLogOut}
                hideSidebar={hideSidebar}
              />
            </>
          ) : (
            <UnAuthSideMenuList hideSidebar={hideSidebar} />
          )}
        </div>
      </nav>
    </>
  );
};
