import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import { ComponentWithSuspense } from "../../components/ComponentWithSuspense/ComponentWithSuspense";
import { Bookmark } from "@/pages/Bookmark/Bookmark";
import DeletePost from "@/pages/DeletePost/DeletePost";
import DeleteComment from "@/pages/DeleteComment/DeleteComment";
import EditComment from "@/pages/EditComment/EditComment";
import Followers from "@/pages/Followers/Followers";
import Followings from "@/pages/Followings/Followings";
const CreatePost = lazy(() => import("../../pages/CreatePost/CreatePost"));
const SearchPost = lazy(() => import("../../pages/SearchPost/SearchPost"));
const Dashboard = lazy(() => import("../../pages/Dashboard/Dashboard"));
const EditPost = lazy(() => import("../../pages/EditPost/EditPost"));

const EditUserProfile = lazy(() =>
  import("../../pages/EditUserProfile/EditUserProfile")
);
//suspense only for create,edit and indi. post because of heavy lib markdown
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
    element: <Dashboard />,
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
    element: <SearchPost />,
  },

  {
    id: uuidv4(),
    path: "/userprofile/edit/:userId",
    element: <EditUserProfile />,
  },
  {
    id: uuidv4(),
    path: "/bookmark",
    element: <Bookmark />,
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
    path: "/comment/edit/:commentId/:content",
    element: <EditComment />,
  },
  {
    id: uuidv4(),
    path: "/user/:userId/followers",
    element: <Followers />,
  },
  {
    id: uuidv4(),
    path: "/user/:userId/followings",
    element: <Followings />,
  },
];
