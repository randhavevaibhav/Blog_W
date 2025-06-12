import { Route } from "react-router-dom";
import { unAuthRoutesList } from "./UnAuthRoutesList";

export const UnAuthRoutes = () => {
 
  return unAuthRoutesList.map((route, i) => {
    return <Route path={route.path} element={route.element} key={i} />;
  });
};
