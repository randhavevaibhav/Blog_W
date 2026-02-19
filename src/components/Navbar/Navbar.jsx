import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";

import { SideNav } from "./SideNav/SideNav";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogout } from "../../hooks/auth/useLogout";
import { DesNavMenuList } from "./DesNavMenuList/DesNavMenuList";
import { ThemeToggle } from "./ThemeToggle/ThemeToggle";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";
import { SearchPostForm } from "./SearchPostForm/SearchPostForm";
import { Button } from "../ui/button";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCreate } from "react-icons/io5";

import useOutsideClick from "../../hooks/utils/useOutsideClick";
import SiteLogo from "../common/SiteLogo/SiteLogo";
import { getCreatePostPageLink, getHomePageLink, getSignInPageLink, getSignupPageLink } from "@/utils/getLinks";

const usePageInfo = (pathname) => ({
  isCreatePostPage: pathname === getCreatePostPageLink(),
  isHomePage: pathname === getHomePageLink(),
  isSearchPage: pathname.includes("/search"),
  isAuthPage: [getSignInPageLink(), getSignupPageLink()].includes(pathname),
});

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuCardRef = useRef(null);

  const { auth } = useAuth();
  const {
    userName = "",
    userProfileImg = "",
    userId = "",
    accessToken,
  } = auth || {};
  const isLoggedIn = !!accessToken;

  const logout = useLogout({ navigateTo: "/" });
  const location = useLocation();
  const navigate = useNavigate();

  const { isCreatePostPage, isHomePage, isSearchPage, isAuthPage } =
    usePageInfo(location.pathname);
  const showSearchBar = isHomePage || isSearchPage;

  const handleShowSidebar = () => {
    setShowSidebar(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideSidebar = () => {
    setShowSidebar(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleLogOut = async () => {
    setShowNavMenu(false);
    await logout();
  };

  const toggleNavMenu = () => setShowNavMenu((prev) => !prev);

  useOutsideClick(navMenuCardRef, (e) => {
    if (e.target.id !== "profileImg") {
      setShowNavMenu(false);
    }
  });

  useEffect(() => {
    setShowNavMenu(false);
  }, [location.pathname]);

  if (isAuthPage) return null;

  return (
    <>
      <header className="pt-1 h-header shadow fixed top-0 left-0 right-0 bg-bg-primary z-nav border">
        <div className="max-w-siteWidth mx-auto flex items-center relative justify-between">
          {isLoggedIn && (
            <button
              onClick={handleShowSidebar}
              className="cursor-pointer md:hidden block px-2"
              aria-label="Open sidebar"
            >
              <RxHamburgerMenu size={25} />
            </button>
          )}

          {createPortal(
            <SideNav
              showSidebar={showSidebar}
              hideSidebar={handleHideSidebar}
            />,
            document.body
          )}

          <SiteLogo cb={handleHideSidebar} />
          { showSearchBar && (
            <SearchPostForm className="md:block hidden" />
          )}

          <div className={`flex ${!isLoggedIn ? "w-full" : ""}`}>
            <div className="hidden md:flex mr-4">
              {isLoggedIn ? (
                <nav className="flex items-center gap-6">
                  {!isCreatePostPage ? (
                    <Button
                      variant="action"
                      onClick={() => navigate(getCreatePostPageLink())}
                      data-test={`create-post-btn`}
                      size={`lg`}
                    >
                      <IoCreate className="text-fs_lg" />
                      Create post
                    </Button>
                  ) : null}
                  <button
                    className="text-lg font-bold flex"
                    onClick={toggleNavMenu}
                    aria-expanded={showNavMenu}
                    aria-controls="user-menu"
                  >
                    <UserAvatar
                      userProfileImg={userProfileImg}
                      avatarSize="small"
                      data-test={`user-avatar`}
                    />
                  </button>

                  {showNavMenu ? (
                    <DesNavMenuList
                      handleLogOut={handleLogOut}
                      hideNavMenu={() => setShowNavMenu(false)}
                      navMenuCardRef={navMenuCardRef}
                      userName={userName}
                      userId={userId}
                    />
                  ) : null}
                </nav>
              ) : null}
            </div>

            <div className="flex ml-auto">
              {!isLoggedIn ? (
                <Button
                  variant="action"
                 
                  onClick={() => navigate(getSignupPageLink())}
                  className=" mr-5 h-9 md:h-10"
                  data-test={`create_account`}
                >
                  <span className="text-fs_base font-semibold">
                    Create account
                  </span>
                </Button>
              ) : null}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      { showSearchBar ? (
        <SearchPostForm className="md:hidden block mt-[60px] mx-2" />
      ) : null}
    </>
  );
};
