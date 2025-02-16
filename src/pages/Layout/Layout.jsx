import { Outlet } from "react-router-dom";
import { MainLayout } from "../../components/MainLayout/MainLayout";

export const Layout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
