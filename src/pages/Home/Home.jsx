import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { ArticleSection } from "../../components/Home/ArticleSection/ArticleSection";
const Home = () => {
  return (
    <>
      <MainLayout
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-4 md:p-0 px-4`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className=" bg-bg-shade md:block hidden">Sidebar</div>

        <ArticleSection />

        <div className=" bg-bg-shade md:block hidden">Ads</div>
      </MainLayout>
    </>
  );
};

export default Home;
