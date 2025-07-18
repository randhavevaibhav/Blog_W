import { useAuth } from "../../hooks/auth/useAuth";

import { SideMenuList } from "./SideMenuList";
import { useLogout } from "../../hooks/auth/useLogout";

import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { useRef } from "react";

export const SideNav = ({ showSidebar, hideSidebar }) => {
  const { auth, setPersist } = useAuth();
  const logout = useLogout({ navigateTo: "/" });
  const sideNavRef = useRef(null);
  useOutsideClick(sideNavRef, () => {
    hideSidebar();
  });
  const { userName, userMail, userProfileImg, userId } = auth;

  const handleLogOut = async (node) => {
    setPersist(false);
    localStorage.clear();
    await logout();
    hideSidebar();
  };
  return (
    <>
      {/* Mobile nav */}
      <div
        className={`inset-0 bg-gray-900 size-full start-0 bg-opacity-30 fixed  z-modal ${
          showSidebar ? "visible" : "invisible"
        }`}
      >
        <nav
          className={`md:hidden  bg-bg-primary text-text-primary fixed top-0 bottom-0 left-0 z-nav duration-300 ${
            showSidebar ? `translate-x-0` : `-translate-x-full`
          }  shadow border border-card-border pt-6`}
          ref={sideNavRef}
        >
          <div className="px-4 flex flex-col gap-2  h-full min-w-[240px]">
            {auth.userId ? (
              <>
                <SideMenuList
                  handleLogOut={handleLogOut}
                  hideSidebar={hideSidebar}
                  userId={userId}
                  userName={userName}
                  userMail={userMail}
                  userProfileImg={userProfileImg}
                />
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </>
  );
};
