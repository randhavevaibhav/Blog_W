import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { Link } from "react-router-dom";

export const NavMenuList = ({
  navMenuCardRef,
  hideNavMenu,
  userName,
  userEmailName,
  handleLogOut,
  userId,
}) => {
  const { preFetchAllOwnPosts, preFetchBookmarks, preFetchUserInfo } =
    usePrefetch();

  return (
    <>
      <div
        className="menu-list absolute top-[108%] px-2 pt-2 pb-4 bg-bg-primary rounded-md right-4 mr-2 min-w-[250px]  border-2 font-medium "
        ref={navMenuCardRef}
      >
        <Link
          to={`/userprofile/${userId}`}
          onClick={hideNavMenu}
          onMouseOver={() => preFetchUserInfo({ userId })}
        >
          <div className="user_info flex flex-col p-2 cursor-pointer rounded-md hover:bg-action-color hover:underline hover:text-white">
            <span className=" text-fs_lg ">{userName}</span>
            <span className="text-fs_small">{userEmailName}</span>
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
          <Link to={`/`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Home
            </li>
          </Link>
          <Link to={`/dashboard`} onMouseOver={preFetchAllOwnPosts}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Dashboard
            </li>
          </Link>
          <Link to={`/new`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Create Post
            </li>
          </Link>
          <Link to={`/userprofile/edit/${userId}`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Edit user
            </li>
          </Link>
          <Link to={`/bookmark`} onMouseOver={preFetchBookmarks}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Bookmark
            </li>
          </Link>
        </ul>
        <hr className="my-2" />
        <Link
          to={`/signin`}
          className="block p-2 hover:bg-action-color hover:text-white rounded-md cursor-pointer desk_nav_list_item capitalize"
          onClick={handleLogOut}
        >
          Logout
        </Link>
      </div>
    </>
  );
};
