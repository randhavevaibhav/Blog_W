import { Suspense } from "react";

import { LoadingTextWithGIF } from "./common/LoadingTextWithGIF/LoadingTextWithGIF";
import { MainLayout } from "./common/MainLayout/MainLayout";

export const ComponentWithSuspense = ({ children }) => {
  const renderLoader = () => {
    return (
      <MainLayout>
        <LoadingTextWithGIF>
          <span className="font-medium text-lg">
            Loading app please wait ...
          </span>
        </LoadingTextWithGIF>
      </MainLayout>
    );
  };

  return <Suspense fallback={renderLoader()}>{children}</Suspense>;
};
