import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import { PersistLogin } from "../../pages/PersistLogin/PersistLogin";
import { authRoutesList } from "./AuthRoutesList";
import { ComponentWithSuspense } from "@/components/ComponentWithSuspense/ComponentWithSuspense";

const IndividualPost = lazy(() =>
  import("../../pages/IndividualPost/IndividualPost")
);
const Home = lazy(() => import("../../pages/Home/Home"));

const UserProfile = lazy(() => import("../../pages/UserProfile/UserProfile"));

export const AuthRoutes = () => {
  return (
    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth />}>
        {authRoutesList.map((route, i) => {
          return <Route path={route.path} element={route.element} key={i} />;
        })}
      </Route>
       
      <Route path={"/"} element={<Home />} />
      <Route
        path={"/post/:userId/:postId"}
        element={
          <ComponentWithSuspense>
            <IndividualPost />
          </ComponentWithSuspense>
        }
      />
      <Route path={"/userprofile/:userId"} element={<UserProfile />} />
    </Route>
  );
};
