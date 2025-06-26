import { useAuth } from "../../hooks/auth/useAuth";
import { Link } from "react-router-dom";

import { SideMenuList } from "./SideMenuList";
import { useLogout } from "../../hooks/auth/useLogout";

import { IoClose } from "react-icons/io5";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";
import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { useRef } from "react";
import { MdLogin } from "react-icons/md";

const UnAuthSideMenuList = ({ hideSidebar }) => {
  return (
    <ul className="flex flex-col gap-4" onClick={() => hideSidebar()}>
      <li className="px-2">
        <Link
          to={`/signup`}
          className=" md:block flex items-center gap-2 text-fs_lg p-2 rounded-lg   bg-bg-shade"
        >
         
          <span className="font-medium">Signup</span>
        </Link>
      </li>
      <li className="px-2">
        <Link
          to={`/signin`}
          className=" md:block flex items-center gap-2 text-fs_lg p-2 rounded-lg   bg-bg-shade"
        >
           <MdLogin size={'20px'}/>
          <span className="font-medium">Signin</span>
        </Link>
      </li>
    </ul>
  );
};

export const SideNav = ({ showSidebar, hideSidebar, userEmailName }) => {
  const { auth, setPersist } = useAuth();
  const logout = useLogout();
  const sideNavRef = useRef(null);
  useOutsideClick(sideNavRef,()=>{
    hideSidebar()
  })
  const { userName, userMail, userProfileImg, userId } = auth;

  const handleLogOut = async (node) => {
    setPersist(false);
    localStorage.clear();
    await logout();
    hideSidebar();
  };
  return (
    <>
      {/* Mobile nav duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }*/}
      <div
        className={`inset-0 bg-gray-900 size-full start-0 bg-opacity-30 fixed  z-modal ${showSidebar?'visible':'invisible'}`}
      
      >
        <nav
          className={`md:hidden  bg-bg-primary text-text-primary fixed top-0 bottom-0 left-0 z-nav duration-300 ${
            showSidebar ? `translate-x-0` : `-translate-x-full`
          }  shadow border border-card-border`}
          ref={sideNavRef}
        >
         <button className="absolute right-2 top-2 p-2" onClick={hideSidebar}>
           <IoClose
            
            className="cursor-pointer"
            size={`25px`}
          />
         </button>

          <div className="px-4 flex flex-col gap-2 mt-8 h-full">
            {auth.userId ? (
              <>
                <Link
                  className="brand grid grid-cols-[80px_1fr] items-center  px-4 py-2  rounded-md "
                  to={`/userprofile/${userId}`}
                  onClick={hideSidebar}
                >
                  <UserAvatar userProfileImg={userProfileImg} />

                  <div className="user_info flex flex-col p-2 gap-2">
                    <span className="text-fs_xl font-bold">{userName}</span>
                    <span className="text-fs_small">{userMail}</span>
                  </div>
                </Link>

                <hr />

                <SideMenuList
                  handleLogOut={handleLogOut}
                  hideSidebar={hideSidebar}
                  userEmailName={userEmailName}
                  userId={userId}
                />
              </>
            ) : (
              // <UnAuthSideMenuList hideSidebar={hideSidebar} />
              null
            )}
          </div>
        </nav>
      </div>
    </>
  );
};
