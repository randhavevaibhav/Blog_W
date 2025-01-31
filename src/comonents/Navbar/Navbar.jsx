import { createPortal } from "react-dom";
import { useState } from "react";

import { toggleTheme } from "../../utils/browser";

import { FaMoon } from "react-icons/fa6";
import { LuSunMedium } from "react-icons/lu";

import branSVG from "../../assets/brand.svg";

import { NavMenuData } from "../../utils/data";
import { SideNav } from "./SideNav";
import { NavMenuList } from "./NavMenuList";
import { Link } from "react-router-dom";
import { Hanmburger } from "../Hamburger/Hamburger";

export const Navbar = () => {
  const [showSidebar, setShowSidebr] = useState(false);

  const toggleShowSidebar = () => {
    setShowSidebr((tg) => !tg);
  };
  return (
    <header className="flex justify-between p-2  h-header items-center shadow fixed top-0 w-full backdrop-blur-md z-[99]">
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
        <nav className="hidden md:flex items-center">
          <NavMenuList list={NavMenuData} />
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
