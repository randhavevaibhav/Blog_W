import { Footer } from "../../components/Footer/Footer";
import { MainLayout } from "../../components/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostContainer } from "../../components/Dashboard/PostContainer/PostContainer";

export const Dashboard = () => {
  return (
    <>
      <MainLayout className="main_container h-screen p-2">
        <Header />
        {/*Side container */}
        <div className="sidebar md:block hidden">Sidebar</div>
        {/* users all posts container */}
        <PostContainer />
      </MainLayout>
      <Footer />
    </>
  );
};
