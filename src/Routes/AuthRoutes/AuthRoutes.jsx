import React from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import { PersistLogin } from "../../pages/PersistLogin/PersistLogin";
import { authRoutesList } from "./AuthRoutesList";
import Home from "@/pages/Home/Home";
import UserProfile from "@/pages/UserProfile/UserProfile";
import TaggedPosts from "@/pages/TaggedPosts/TaggedPosts";
import IndividualPost from "@/pages/IndividualPost/IndividualPost";

export const AuthRoutes = () => {
  return (
    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth />}>
        {authRoutesList.map((route, i) => {
          return <Route path={route.path} element={route.element} key={i} />;
        })}
      </Route>

      <Route path={"/"} element={<Home />} />
      <Route path={"/tag/:hashtagId/:hashtagName"} element={<TaggedPosts />} />
      <Route path={"/post/:postId"} element={<IndividualPost />} />
      <Route path={"/userprofile/:userId"} element={<UserProfile />} />
    </Route>
  );
};
