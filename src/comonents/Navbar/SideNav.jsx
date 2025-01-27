import { NavMenuList } from "./NavMenuList";
import { NavMenuData } from "../../utils/data";
export const SideNav = ({ showSidebar,handleShowSidebar}) => {
    return (
      <>
        {/* Mobile nav */}
        <nav
          className={`md:hidden bg-slate-700 text-black absolute top-[3rem] inset-0 duration-300 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <NavMenuList list={NavMenuData} direction="col" handleShowSidebar={handleShowSidebar}/>
        </nav>
      </>
    );
  };