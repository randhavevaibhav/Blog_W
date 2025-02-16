import { NavMenuList } from "./NavMenuList";
import { authNavMenuData, unAuthNavMenuData } from "../../utils/data";
import { Input } from "../Input/Input";
import { useAuth } from "../../hooks/useAuth";
export const SideNav = ({ showSidebar, handleShowSidebar }) => {
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
            list={authNavMenuData}
            direction="col"
            handleShowSidebar={handleShowSidebar}
          />
        </div>
      </nav>
    </>
  );
};
