import { Link } from "react-router-dom";

export const NavMenuList = ({ list, handleLogOut }) => {
  return (
    <ul className="flex">
      {list.map((item) => (
        <li className="px-2" key={item.id}>
          <Link
            to={item.linkTo}
            className="flex items-center gap-2 text-lg p-2 "
            onClick={() => handleLogOut(item.node)}
          >
            <span> {item.node}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
