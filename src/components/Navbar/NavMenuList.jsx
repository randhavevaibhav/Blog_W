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
            className="text-lg "
            onClick={() => handleLogOut(item.node)}
          >
            {item.node}
          </Link>
        </li>
      ))}
    </ul>
  );
};
