import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

const PageNotFound = () => {
  return (
    <MainLayout className="mb-0">
      {" "}
      <div className="flex h-scminushd justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/5a5ebd67-fba5-4e6b-b7fc-5a2531804522/dLbebSx1Rh.lottie"
          loop
          autoplay
          className="md:size-[500px] size-[300px]"
        />
      </div>
    </MainLayout>
  );
};

export default PageNotFound;
