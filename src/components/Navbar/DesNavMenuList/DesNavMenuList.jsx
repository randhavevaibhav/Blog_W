import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import useKeyPress from "@/hooks/utils/useKeyPress";
import { getBookmarkPageLink, getCreatePostPageLink, getDashboardPageLink, getFollowersPageLink, getFollowingsPageLink, getHomePageLink, getUpdateUserPageLink, getUserProfilePageLink } from "@/utils/getLinks";
import { Link } from "react-router-dom";

export const DesNavMenuList = ({
  navMenuCardRef,
  hideNavMenu,
  userName,
  userEmailName,
  handleLogOut,
  userId,
}) => {
  const {
    preFetchAllUserPosts,
    preFetchBookmarks,
    preFetchUserInfo,
    preFetchUserFollowers,
    preFetchUserFollowings
  } = usePrefetch();

  useKeyPress("Escape", () => hideNavMenu());

  return (
    <>
      <div
        className="menu-list absolute top-[125%] px-2 pt-2 pb-4 bg-bg-primary rounded-md right-4 mr-2 min-w-[250px]  border-2 font-medium "
        ref={navMenuCardRef}
      >
        <Link
          to={getUserProfilePageLink({
            userId
          })}
          data-test={`user-profile-link`}
          onClick={hideNavMenu}
          onMouseOver={() => preFetchUserInfo({ userId })}
        >
          <div className="user_info flex flex-col p-2 cursor-pointer rounded-md hover:bg-action-color hover:underline hover:text-white">
            <span className=" text-fs_lg capitalize">{userName}</span>
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
          <Link to={getHomePageLink()} data-test={`home-link`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Home
            </li>
          </Link>
          <Link
            to={getDashboardPageLink()}
            onMouseOver={() => {
              preFetchAllUserPosts();
              preFetchUserInfo({ userId });
            }}
            data-test={`dashboard-link`}
          >
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Dashboard
            </li>
          </Link>
          <Link to={getCreatePostPageLink()} data-test={`create-post-link`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Create Post
            </li>
          </Link>
          <Link to={getUpdateUserPageLink()} data-test={`edit-profile-link`}>
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Edit Profile
            </li>
          </Link>
          <Link
            to={getBookmarkPageLink()}
            onMouseOver={preFetchBookmarks}
            data-test={`bookmark-link`}
          >
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Bookmark
            </li>
          </Link>
          <Link
            to={getFollowersPageLink()}
            onMouseOver={() => preFetchUserFollowers({ userId })}
            data-test={`followers-link`}
          >
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Followers
            </li>
          </Link>
          <Link
            to={getFollowingsPageLink()}
            onMouseOver={() => preFetchUserFollowings({ userId })}
            data-test={`following-users-link`}
          >
            <li className="p-2 hover:bg-action-color hover:text-white rounded-md desk_nav_list_item capitalize">
              Following users
            </li>
          </Link>
        </ul>
        <hr className="my-2" />
        <Link
          to={getHomePageLink()}
          className="block p-2 hover:bg-action-color hover:text-white rounded-md cursor-pointer desk_nav_list_item capitalize"
          onClick={handleLogOut}
          data-test={`logout-link`}
        >
          Logout
        </Link>
      </div>
    </>
  );
};
