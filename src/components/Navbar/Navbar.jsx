import { createPortal } from "react-dom";
import { useRef, useState } from "react";

import { SideNav } from "./SideNav";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogout } from "../../hooks/auth/useLogout";

import { FaBlog } from "react-icons/fa";

import useOutsideClick from "../../hooks/utils/useOutsideClick";

import { NavMenuList } from "./NavMenuList";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";

import { IoCreate } from "react-icons/io5";
import { Button } from "../ui/button";
import { SearchPostForm } from "../SearchPost/SearchPostForm/SearchPostForm";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
export const Navbar = () => {
  const [showSidebar, setShowSidebr] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuCardRef = useRef(null);
  const location = useLocation();
  useOutsideClick(navMenuCardRef, (e) => {
    if (e.target.id !== "profileImg") {
      setShowNavMenu(false);
    }
  });

  const isCreatePostPage = location.pathname === "/new";
  const isHomePage = location.pathname === "/";
  const isSearchPage = location.pathname === "/search";

  const showSearchBar = isHomePage || isSearchPage;
  const { userName, userMail, userProfileImg, userId } = auth;

  const userEmailName = userMail?.split("@")[0] + `@`;

  const hideNavMenu = () => {
    setShowNavMenu(false);
  };

  const handleShowSidebar = () => {
    setShowSidebr(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideSidebar = () => {
    setShowSidebr(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleLogOut = async () => {
    hideNavMenu();
    await logout();
  };
  // console.log("location.pathname==> ", location.pathname);

  return (
    <>
      <header className="p-2 h-header shadow fixed top-0 left-0 right-0 bg-bg-primary z-nav border">
        <div className="max-w-siteWidth mx-auto flex items-center relative md:justify-normal justify-between">
          {auth.accessToken ? (
            <button
              onClick={handleShowSidebar}
              className="cursor-pointer md:hidden block pt-2 px-2"
            >
              <RxHamburgerMenu size={"25px"} />
            </button>
          ) : null}

          {createPortal(
            <SideNav
              showSidebar={showSidebar}
              hideSidebar={handleHideSidebar}
              userEmailName={userEmailName}
            />,
            document.body
          )}

          <div className="logo ml-4">
            <Link to="/" onClick={() => setShowSidebr(false)}>
              <FaBlog size={"25px"} />
            </Link>
          </div>
          {auth.accessToken && showSearchBar ? (
            <>
              <SearchPostForm className="md:block hidden" />
            </>
          ) : null}

          <div className="flex md:ml-auto">
            {/* Desktop nav */}
            <div className="hidden md:flex  mr-4">
              {auth.accessToken ? (
                <>
                  <nav className="flex items-center gap-6">
                    {!isCreatePostPage ? (
                      <Link to={`/new`}>
                        <Button className={`cursor-pointer `} variant="action">
                          <IoCreate className="text-fs_lg" />
                          Create post
                        </Button>
                      </Link>
                    ) : null}
                    <button
                      className="text-lg font-bold flex "
                      onClick={() =>
                        setShowNavMenu((prev) => {
                          // console.log("toggle")
                          return !prev;
                        })
                      }
                    >
                      <UserAvatar
                        userProfileImg={userProfileImg}
                        avatarSize="small"
                      />
                    </button>

                    {/* Desk. Menu card */}
                    {showNavMenu ? (
                      <NavMenuList
                        handleLogOut={handleLogOut}
                        hideNavMenu={hideNavMenu}
                        navMenuCardRef={navMenuCardRef}
                        userEmailName={userEmailName}
                        userName={userName}
                        userId={userId}
                      />
                    ) : null}
                  </nav>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link to={`/signin`}>
                    {" "}
                    <Button variant="action">Login</Button>
                  </Link>

                  <Link to={`/signup`}>
                    <Button variant="">Create account</Button>
                  </Link>
                </div>
              )}
            </div>
            {/*  theme toggle */}
            <div className="flex gap-2">
              {!auth.accessToken ? (
                <>
                  <Link to={`/signin`}>
                    {" "}
                    <Button variant="action" className={`md:hidden block`}>
                      Login
                    </Button>
                  </Link>
                </>
              ) : null}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      {auth.accessToken && showSearchBar ? (
        <SearchPostForm className="md:hidden block mt-[60px] mx-2" />
      ) : null}
    </>
  );
};
