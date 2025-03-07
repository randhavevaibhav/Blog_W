import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";

import { useAuth } from "../../hooks/auth/useAuth";




export const NavMenuList = ({
  list,
  direction = "row",
  handleShowSidebar = () => {},
}) => {
  const logout = useLogout();
  const { setPersist } = useAuth();

  const handleLogOut = async (node) => {
    if (node === "Log out") {
      await logout();

      setPersist(false);
      localStorage.clear();
    }
  };
  return (
    <ul className={`flex gap-2 ${direction === "col" && "flex-col"}`}>
      {list.map((item) => (
        <li className="px-2" key={item.id} onClick={() => handleShowSidebar()}>
          <Link
            to={item.linkTo}
            className=" md:block flex items-center gap-2 text-xl p-4   dark:bg-[#212020] bg-[#efefef]"
            onClick={() => handleLogOut(item.node)}
           
          >
            <span>{item.icon}</span>

           <span > {item.node}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
