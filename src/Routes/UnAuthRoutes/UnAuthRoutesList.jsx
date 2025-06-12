import { v4 as uuidv4 } from "uuid";
import { lazy } from "react";
import TerminateSession from "@/pages/TerminateSession/TerminateSession";



const SignUp = lazy(() => import("../../pages/SignUp/SignUp"));
const SignIn = lazy(() => import("../../pages/SignIn/SignIn"));

const PageNotFound = lazy(() =>
  import("../../pages/PageNotFound/PageNotFound")
);

export const unAuthRoutesList = [
  {
    id: uuidv4(),
    path: "/signup",
    element: <SignUp />,
  },
  {
    id: uuidv4(),
    path: "/signin",
    element: <SignIn />,
  },
  {
    id: uuidv4(),
    path: "/terminate",
    element: <TerminateSession />,
  },
  {
    id: uuidv4(),
    path: "*",
    element: <PageNotFound />,
  },
];
