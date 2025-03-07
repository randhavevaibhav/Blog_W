import { createPortal } from "react-dom";
import { useState } from "react";

import { getLocalStorageItem, toggleTheme } from "../../utils/browser";

import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";

import branSVG from "../../assets/brand.svg";

import { authNavMenuData, unAuthNavMenuData } from "../../utils/data";
import { SideNav } from "./SideNav";
import { Link } from "react-router-dom";
import { Hanmburger } from "../common/Hamburger/Hamburger";
import { useAuth } from "../../hooks/auth/useAuth";
import { localUserMail, localUserName } from "../../utils/constants";

export const Navbar = () => {
  const [showSidebar, setShowSidebr] = useState(false);
  const { auth } = useAuth();
  //console.log("auth state ===> ", auth);
  const userName = getLocalStorageItem(localUserName);
  const userMail = getLocalStorageItem(localUserMail);
  const NavMenuData = auth.accessToken ? authNavMenuData : unAuthNavMenuData;

  const toggleShowSidebar = () => {
    setShowSidebr((tg) => !tg);
  };

  const handleLogOut = async (node) => {
    if (node === "Log out") {
      await logout();

      setPersist(false);
      localStorage.clear();
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
          handleShowSidebar={() => setShowSidebr(false)}
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
          <Link to={`/`} className="text-lg font-bold">
            <div className="user_info flex flex-col">
              <span>{userName}</span>
              <span className="text-sm">{userMail}</span>
            </div>
          </Link>
          {NavMenuData.map((item) => (
           
            <li className="px-2 list-none" key={item.id}>
              <Link
                to={item.linkTo}
                className="flex items-center gap-2 text-lg p-2 "
                onClick={() => handleLogOut(item.node)}
              >
                <span> {item.node}</span>
              </Link>
            </li>
          ))}
        </nav>
        {/* Avatar and theme toggle */}
        <div className=" flex items-center">
          <div className="px-2">
            <a href="#" className="cursor-pointer">
              <img src={branSVG} width="30" alt="" />
            </a>
          </div>
          <FaMoon
            className="dark:hidden"
            size={"22px"}
            onClick={() => {
              toggleTheme();
            }}
          />
          <LuSunMedium
            className="hidden dark:block"
            size={"22px"}
            onClick={() => {
              toggleTheme();
            }}
          />
        </div>
      </div>
    </header>
  );
};
