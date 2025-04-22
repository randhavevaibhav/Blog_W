import { Link } from "react-router-dom";

export const NavMenuList = ({ navMenuCardRef,hideNavMenu, userName,userEmailName,handleLogOut }) => {
  return (
    <div
    className="menu-list absolute top-full px-2 pb-4 bg-bg-primary rounded-md right-4 mr-2 min-w-[250px] border border-bg-shade font-medium"
    ref={navMenuCardRef}
  >
   <Link to={`user/${userEmailName}`} onClick={hideNavMenu}>
   <div className="user_info flex flex-col p-2 cursor-pointer">
      <span className="text-gray-400">{userName}</span>
      <span className="text-gray-400 text-sm">{userEmailName}</span>
    </div>
   </Link>
    <hr className="my-2" />
    <ul
      className="flex flex-col gap-2 cursor-pointer"
      onClick={(e) => {
        if (e.target.matches("li")) {
          hideNavMenu();
        }
      }}
    >
      <Link to={`/dashboard`}>
        <li className="p-2 hover:bg-bg-shade rounded-md desk_nav_list_item">
          Dashboard
        </li>
      </Link>
      <Link to={`/new`}>
        <li className="p-2 hover:bg-bg-shade rounded-md desk_nav_list_item">
          Create Post
        </li>
      </Link>
      <Link to={`/edit/${userEmailName}`}>
        <li className="p-2 hover:bg-bg-shade rounded-md desk_nav_list_item">
          Edit user
        </li>
      </Link>
      <Link to={`#`}>
        <li className="p-2 hover:bg-bg-shade rounded-md desk_nav_list_item">
          Reading list
        </li>
      </Link>
    </ul>
    <hr className="my-2" />
    <Link
      to={`/logout`}
      className="block p-2 hover:bg-bg-shade rounded-md cursor-pointer desk_nav_list_item"
      onClick={handleLogOut}
    >
      Logout
    </Link>
  </div>
  );
};
