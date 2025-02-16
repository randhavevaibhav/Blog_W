import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.userId ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};
