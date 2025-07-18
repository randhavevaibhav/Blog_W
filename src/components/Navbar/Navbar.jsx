import { createPortal } from "react-dom";
import { useRef, useState } from "react";

import { SideNav } from "./SideNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { useLogout } from "../../hooks/auth/useLogout";

import { FaBlog } from "react-icons/fa";

import useOutsideClick from "../../hooks/utils/useOutsideClick";

import { NavMenuList } from "./NavMenuList";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";

import { IoCreate } from "react-icons/io5";
import { Button } from "../ui/button";
import { SearchPostForm } from "./SearchPostForm/SearchPostForm";
import { RxHamburgerMenu } from "react-icons/rx";

export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { auth } = useAuth();
  const logout = useLogout();
  const [showNavMenu, setShowNavMenu] = useState(false);
  const navMenuCardRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  useOutsideClick(navMenuCardRef, (e) => {
    if (e.target.id !== "profileImg") {
      setShowNavMenu(false);
    }
  });

  const isCreatePostPage = location.pathname === "/new";
  const isHomePage = location.pathname === "/";
  const isSearchPage = location.pathname === "/search";
  const isSiginOrSignupPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  const showSearchBar = isHomePage || isSearchPage;
  const { userName, userMail, userProfileImg, userId } = auth;

  const userEmailName = userMail?.split("@")[0] + `@`;

  const hideNavMenu = () => {
    setShowNavMenu(false);
  };

  const handleShowSidebar = () => {
    setShowSidebar(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideSidebar = () => {
    setShowSidebar(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleLogOut = async () => {
    hideNavMenu();
    await logout();
  };
  // console.log("location.pathname==> ", location.pathname);

  return (
    <>
      {!isSiginOrSignupPage ? (
        <header className="p-2 h-header shadow fixed top-0 left-0 right-0 bg-bg-primary z-nav border pb-[3rem]">
          <div className="max-w-siteWidth mx-auto flex items-center relative  justify-between">
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

            {auth.accessToken ? (
              <div className="logo ml-4">
                <Link to="/" onClick={() => setShowSidebar(false)}>
                  <FaBlog size={"30px"} />
                </Link>
              </div>
            ) : null}
            {auth.accessToken && showSearchBar ? (
              <>
                <SearchPostForm className="md:block hidden" />
              </>
            ) : null}

            <div className={`flex ${!auth.accessToken ? `w-full` : ``}`}>
              {/* Desktop nav */}
              <div className="hidden md:flex  mr-4">
                {auth.accessToken ? (
                  <>
                    <nav className="flex items-center gap-6">
                      {!isCreatePostPage ? (
                        <Link to={`/new`}>
                          <Button
                            className={`cursor-pointer `}
                            variant="action"
                          >
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
                ) : null}
              </div>
              {/*  theme toggle */}
              <div className={`flex justify-between w-full`}>
                {!auth.accessToken ? (
                  <Button
                    variant="link"
                    onClick={() => {
                      navigate(`/signup`);
                    }}
                    size={`lg`}
                    className={`border border-action-color text-action-color md:hover:text-white md:hover:bg-action-color`}
                  >
                    <span className="text-fs_base font-semibold">Create account</span>
                  </Button>
                ) : null}

                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
      ) : null}
      {auth.accessToken && showSearchBar ? (
        <SearchPostForm className="md:hidden block mt-[60px] mx-2" />
      ) : null}
    </>
  );
};
