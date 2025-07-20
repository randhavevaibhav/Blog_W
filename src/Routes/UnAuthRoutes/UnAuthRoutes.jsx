import { Route } from "react-router-dom";
import { unAuthRoutesList } from "./UnAuthRoutesList";
import { PersistLogin } from "@/pages/PersistLogin/PersistLogin";

export const UnAuthRoutes = () => {
  return unAuthRoutesList.map((route, i) => {
    return (
      <Route element={<PersistLogin />} key={i}>
        <Route path={route.path} element={route.element} />
      </Route>
    );
  });
};
