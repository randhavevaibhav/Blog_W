import { Footer } from "../../comonents/Footer/Footer";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "./Header/Header";
import { PostContainer } from "./PostContainer/PostContainer";

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
    <Footer/>
    </>
  );
};
