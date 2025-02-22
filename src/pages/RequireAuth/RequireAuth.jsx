import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  //console.log("auth.accessToken in RequireAuth ===> ", auth.accessToken);

  return auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/signup"} state={{ from: location }} replace />
  );
};
