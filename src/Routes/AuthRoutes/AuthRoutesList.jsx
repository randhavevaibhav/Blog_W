import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import { ComponentWithSuspense } from "../../components/ComponentWithSuspense/ComponentWithSuspense";
// import { Bookmark } from "@/pages/Bookmark/Bookmark";
import DeletePost from "@/pages/DeletePost/DeletePost";
import DeleteComment from "@/pages/DeleteComment/DeleteComment";
import EditComment from "@/pages/EditComment/EditComment";
// import Followers from "@/pages/Followers/Followers";
// import Followings from "@/pages/Followings/Followings";
// import Dashboard from "@/pages/Dashboard/Dashboard";
// import SearchPost from "@/pages/SearchPost/SearchPost";
// import EditUserProfile from "@/pages/EditUserProfile/EditUserProfile";

const CreatePost = lazy(() => import("@/pages/CreatePost/CreatePost"));

const EditPost = lazy(() => import("@/pages/EditPost/EditPost"));

const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));

const Followers = lazy(() => import("@/pages/Followers/Followers"));

const Followings = lazy(() => import("@/pages/Followings/Followings"));

const Bookmark = lazy(() => import("@/pages/Bookmark/Bookmark"));

const SearchPost = lazy(() => import("@/pages/SearchPost/SearchPost"));

const EditUserProfile = lazy(() =>
  import("@/pages/EditUserProfile/EditUserProfile")
);

//suspense only for create,edit
export const authRoutesList = [
  {
    id: uuidv4(),
    path: "/new",
    element: (
      <ComponentWithSuspense>
        <CreatePost />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/dashboard",
    element: (
      <ComponentWithSuspense>
        <Dashboard />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/edit/:userId/:postId",
    element: (
      <ComponentWithSuspense>
        <EditPost />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/search",
    element: (
      <ComponentWithSuspense>
        <SearchPost />
      </ComponentWithSuspense>
    ),
  },

  {
    id: uuidv4(),
    path: "/userprofile/edit/:userId",
    element: (
      <ComponentWithSuspense>
        <EditUserProfile />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/bookmark",
    element: (
      <ComponentWithSuspense>
        <Bookmark />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/post/delete/:post_title/:post_id",
    element: <DeletePost />,
  },
  {
    id: uuidv4(),
    path: "/comment/delete/:commentId/:postId/:userId/:hasReplies",
    element: <DeleteComment />,
  },
  {
    id: uuidv4(),
    path: "/comment/edit/:commentId/:content/:postUserId/:postId",
    element: <EditComment />,
  },
  {
    id: uuidv4(),
    path: "/user/:userId/followers",
    element: (
      <ComponentWithSuspense>
        <Followers />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/user/:userId/followings",
    element: (
      <ComponentWithSuspense>
        <Followings />
      </ComponentWithSuspense>
    ),
  },
];
