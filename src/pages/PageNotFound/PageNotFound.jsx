import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { NotFound } from "@/components/common/NotFound/NotFound";

const PageNotFound = ({ children = "Page not found" }) => {
  return (
    <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
     <div className="flex md:h-[50rem] h-screen items-center">
      <NotFound>{children}</NotFound>
     </div>
    </MainLayout>
  );
};

export default PageNotFound;
