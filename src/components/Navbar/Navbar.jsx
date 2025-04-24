import { createPortal } from "react-dom";
import { useRef, useState } from "react";


import { SideNav } from "./SideNav";
import { Link, useLocation } from "react-router-dom";
import { Hanmburger } from "../common/Hamburger/Hamburger";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogout } from "../../hooks/auth/useLogout";

import { FaBlog } from "react-icons/fa";


import useOutsideClick from "../../hooks/utils/useOutsideClick";

import { NavMenuList } from "./NavMenuList";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";

export const Navbar = () => {
  const [showSidebar, setShowSidebr] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();

  const [showNavMenu, setShowNavMenu] = useState(false);

  const navMenuCardRef = useRef(null);

  const location  = useLocation();

 const isCreatePostPage = location.pathname==="/new";
  useOutsideClick(navMenuCardRef, (e) => {
    if (e.target.id !== "profileImg") {
      setShowNavMenu(false);
    }
  });

 

  const { userName, userMail, userProfileImg } = auth;

  const userEmailName = userMail?.split("@")[0] + `@`;

  const hideNavMenu = () => {
    setShowNavMenu(false);
  };

  const toggleShowSidebar = () => {
    setShowSidebr((tg) => !tg);
  };

  const handleLogOut = async () => {
    hideNavMenu();
    await logout();
  };

  return (
    <header className="flex  p-2  h-header items-center shadow fixed top-0 w-full backdrop-blur-md z-nav">
      {/* Trigger */}
      <Hanmburger className={`md:hidden`} show={showSidebar} trigger={toggleShowSidebar} />

      {/* Mob. nav */}

      {createPortal(
        <SideNav
          showSidebar={showSidebar}
          hideSidebar={() => setShowSidebr(false)}
        />,
        document.body
      )}

      <div className="logo md:block hidden">
        <Link to="/" onClick={() => setShowSidebr(false)}>
          <FaBlog size={"25px"} />
        </Link>
      </div>

    <div className="flex ml-auto">
        {/* Desktop nav */}
        <div className="hidden md:flex  mr-4">
        {auth.accessToken ? (
          <nav className="flex items-center gap-6">
           { !isCreatePostPage?<Link to={`/new`} className={`px-2 py-1 border rounded-md cursor-pointer`}>Create Post</Link>:null}
            <Link
              to={`#`}
              className="text-lg font-bold flex "
              onClick={() => setShowNavMenu((prev) => !prev)}
            >
            <UserAvatar userProfileImg={userProfileImg}/>
            </Link>



            {/* Desk. Menu card */}
            {showNavMenu ? (
              <NavMenuList
                handleLogOut={handleLogOut}
                hideNavMenu={hideNavMenu}
                navMenuCardRef={navMenuCardRef}
                userEmailName={userEmailName}
                userName={userName}
              />
            ) : null}
          </nav>
        ) : null}
        
      </div>
      {/*  theme toggle */}
      <ThemeToggle/>
    </div>
    </header>
  );
};
