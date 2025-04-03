import React from "react";
import { Route } from "react-router-dom";
import { RequireAuth } from "../../pages/RequireAuth/RequireAuth";
import { PersistLogin } from "../../pages/PersistLogin/PersistLogin";
import { authRoutesList } from "./AuthRoutesList";

export const AuthRoutes = () => {
  return (
    <Route element={<PersistLogin />}>
      <Route element={<RequireAuth />}>
        {authRoutesList.map((route, i) => {
          return <Route path={route.path} element={route.element} key={i} />;
        })}
      </Route>
    </Route>
  );
};
