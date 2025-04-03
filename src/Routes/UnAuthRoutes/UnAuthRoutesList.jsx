import { v4 as uuidv4 } from "uuid";
import  { lazy } from "react";
import { ComponentWithSuspense } from "../../components/ComponentWithSuspense";

const SignUp = lazy(() => import("../../pages/SignUp/SignUp"));
const SignIn = lazy(() => import("../../pages/SignIn/SignIn"));
const PageNotFound = lazy(() => import("../../pages/PageNotFound/PageNotFound"));

export const unAuthRoutesList= [
  {
    id: uuidv4(),
    path: "/signup",
    element: (
      <ComponentWithSuspense>
        <SignUp />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "/signin",
    element: (
      <ComponentWithSuspense>
        <SignIn />
      </ComponentWithSuspense>
    ),
  },
  {
    id: uuidv4(),
    path: "*",
    element: (
      <ComponentWithSuspense>
        <PageNotFound />
      </ComponentWithSuspense>
    ),
  },
];