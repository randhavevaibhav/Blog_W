import { NavMenuList } from "./NavMenuList";

import { Input } from "../common/Input/Input";
import { authNavMenuData, unAuthNavMenuData } from "../../utils/data";
import { useAuth } from "../../hooks/auth/useAuth";
export const SideNav = ({ showSidebar, handleShowSidebar }) => {
  const { auth } = useAuth();
  const NavMenuData = auth.accessToken ? authNavMenuData : unAuthNavMenuData;
  return (
    <>
      {/* Mobile nav */}
      <nav
        className={`md:hidden bg-slate-700 text-black fixed  top-[var(--header-height)] inset-0 z-50 duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4">
          <Input type="search" className="bg-slate-700 border-none" />
          <NavMenuList
            list={NavMenuData}
            direction="col"
            handleShowSidebar={handleShowSidebar}
          />
        </div>
      </nav>
    </>
  );
};
