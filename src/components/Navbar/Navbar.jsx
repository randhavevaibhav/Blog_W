import { createPortal } from "react-dom";
import { useState } from "react";

import { toggleTheme } from "../../utils/utils";

import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";

import { authNavMenuData, unAuthNavMenuData } from "../../utils/data";
import { SideNav } from "./SideNav";
import { Link } from "react-router-dom";
import { Hanmburger } from "../common/Hamburger/Hamburger";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogout } from "../../hooks/auth/useLogout";
import { NavMenuList } from "./NavMenuList";
import { FaBlog } from "react-icons/fa";
import { useThemeContext } from "../../hooks/Theme/useThemeContext";
export const Navbar = () => {
  const [showSidebar, setShowSidebr] = useState(false);
  const { auth, setPersist } = useAuth();
  const logout = useLogout();
  const { changeThemeToDark, changeThemeToLight } = useThemeContext();

  //console.log("auth state ===> ", auth);
  // const userName = getLocalStorageItem(localUserName);
  // const userMail = getLocalStorageItem(localUserMail);
  const { userName, userMail } = auth;
  const NavMenuData = auth.accessToken ? authNavMenuData : unAuthNavMenuData;

  const toggleShowSidebar = () => {
    setShowSidebr((tg) => !tg);
  };

  const handleLogOut = async (node) => {
    if (node === "Log out") {
      await logout();
    }
  };
  return (
    <header className="flex justify-between p-2  h-header items-center shadow fixed top-0 w-full backdrop-blur-md z-nav">
      {/* Trigger */}
      <Hanmburger show={showSidebar} trigger={toggleShowSidebar} />

      {/* Mob. nav */}

      {createPortal(
        <SideNav
          showSidebar={showSidebar}
          hideSidebar={() => setShowSidebr(false)}
        />,
        document.body
      )}

      <div className="logo">
        <Link to="/" onClick={() => setShowSidebr(false)}>
          Logo
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="flex">
        <nav className="hidden md:flex items-center gap-2">
          <Link to={`/user/${userMail}`} className="text-lg font-bold">
            <div className="user_info flex flex-col">
              <span>{userName}</span>
              <span className="text-sm">{userMail}</span>
            </div>
          </Link>
          <NavMenuList list={NavMenuData} handleLogOut={handleLogOut} />
        </nav>
        {/* Avatar and theme toggle */}
        <div className=" flex gap-4 items-center">
          <FaMoon
            className="dark:hidden cursor-pointer"
            size={"22px"}
            onClick={() => {
              toggleTheme();
              changeThemeToDark();
            }}
          />
          <LuSunMedium
            className="hidden dark:block cursor-pointer"
            size={"22px"}
            onClick={() => {
              toggleTheme();
              changeThemeToLight();
            }}
          />

          <div className="px-2">
            <a href="#" className="cursor-pointer">
              <FaBlog size={"40px"} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
