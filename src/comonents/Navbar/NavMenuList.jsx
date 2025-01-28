import { Link } from "react-router-dom";

export const NavMenuList = ({ list, direction = "row", handleShowSidebar=()=>{} }) => {
  return (
    <ul
      className={`flex gap-2 ${direction === "col" && "flex-col"}`}
    >
      {list.map((item) => (
        <li className="px-2" key={item.id} onClick={() => handleShowSidebar()}>
          <Link to={item.linkTo} className="text-lg ">
            {item.node}
          </Link>
        </li>
      ))}
    </ul>
  );
};
