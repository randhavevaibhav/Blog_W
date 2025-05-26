import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";
import { ComponentWithSuspense } from "../../components/ComponentWithSuspense";
import { Bookmark } from "@/pages/Bookmark/Bookmark";

const Home = lazy(() => import("../../pages/Home/Home"));
const CreatePost = lazy(() => import("../../pages/CreatePost/CreatePost"));
const Dashboard = lazy(() => import("../../pages/Dashboard/Dashboard"));
const IndiviualPost = lazy(() =>
  import("../../pages/IndiviualPost/IndiviualPost")
);
const EditPost = lazy(() => import("../../pages/EditPost/EditPost"));
const UserProfile = lazy(() => import("../../pages/UserProfile/UserProfile"));
const EditUserProfile = lazy(() =>
  import("../../pages/EditUserProfile/EditUserProfile")
);
//suspense only for create,edit and indi. post because of heavy lib markdown
export const authRoutesList = [
  {
    id: uuidv4(),
    path: "/",
    element: <Home />,
  },
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
    path: "/post/:userId/:postId",
    element: (
      <ComponentWithSuspense>
        <IndiviualPost />
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
    path: "/userprofile/:userId",
    element: <UserProfile />,
  },
  {
    id: uuidv4(),
    path: "/userprofile/edit/:userId",
    element: <EditUserProfile />,
  },
    {
    id: uuidv4(),
    path: "/bookmark",
    element: <Bookmark/>,
  },
];
