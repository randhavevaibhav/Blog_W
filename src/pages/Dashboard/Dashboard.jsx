import { Footer } from "../../components/Footer/Footer";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { useRefreshToken } from "../../hooks/useRefreshToken";

import "./Dashboard.css";
import { Header } from "./Header/Header";
import { PostContainer } from "./PostContainer/PostContainer";
import { Button } from "../../components/Button/Button";
export const Dashboard = () => {
  const refresh = useRefreshToken();
  return (
    <>
      <MainLayout className="main_container h-screen p-2">
        <Header />
        {/*Side container */}
        <div className="sidebar md:block hidden">Sidebar</div>
        {/* users all posts container */}
        <PostContainer />
        <Button onClick={() => refresh()}>Refresh</Button>
      </MainLayout>
      <Footer />
    </>
  );
};
