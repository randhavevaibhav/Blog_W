import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
const Loading = ({ children = "Loading ..." }) => {
  return (
    <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
      <LoadingTextWithSpinner direction="center">
        {children}
      </LoadingTextWithSpinner>
    </MainLayout>
  );
};

export default Loading;
