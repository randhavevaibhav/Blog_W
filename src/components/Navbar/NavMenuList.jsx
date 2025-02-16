import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const NavMenuList = ({
  list,
  direction = "row",
  handleShowSidebar = () => {},
}) => {
  const { setAuth } = useAuth();
  const handleLogOut = (node) => {
    if (node === "Log out") {
      setAuth({});
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
