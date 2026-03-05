import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import { PersistLogin } from "../../pages/PersistLogin/PersistLogin";
import { authRoutesList } from "./AuthRoutesList";
import Home from "@/pages/Home/Home";
import { ComponentWithSuspense } from "@/components/ComponentWithSuspense/ComponentWithSuspense";

const TaggedPosts = lazy(() => import("@/pages/TaggedPosts/TaggedPosts"));
const IndividualPost = lazy(
  () => import("@/pages/IndividualPost/IndividualPost"),
);
const UserProfile = lazy(() => import("@/pages/UserProfile/UserProfile"));

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
        path={"/tag/:hashtagId/:hashtagName/:hashtagColor"}
        element={
          <ComponentWithSuspense>
            <TaggedPosts />
          </ComponentWithSuspense>
        }
      />
      <Route
        path={"/post/:postId"}
        element={
          <ComponentWithSuspense>
            <IndividualPost />
          </ComponentWithSuspense>
        }
      />
      <Route
        path={"/userprofile/:userId"}
        element={
          <ComponentWithSuspense>
            <UserProfile />
          </ComponentWithSuspense>
        }
      />
    </Route>
  );
};
