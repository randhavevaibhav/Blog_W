import { Outlet } from "react-router-dom";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

export const Layout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
