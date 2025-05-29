import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { Footer } from "../../components/common/Footer/Footer";
import { ArticleSection } from "../../components/Home/ArticleSection/ArticleSection";
const Home = () => {
 
  return (
    <>
      <MainLayout
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-2`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className=" bg-bg-shade md:block hidden">Sidebar</div>
        <div className="md:p-4 p-1">
          <ArticleSection />
        </div>
        <div className=" bg-bg-shade md:block hidden">Ads</div>
      </MainLayout>
      <Footer />
    </>
  );
};


export default Home;