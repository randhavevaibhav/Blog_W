import { Suspense } from "react";

import { LoadingTextWithGIF } from "./common/LoadingTextWithGIF/LoadingTextWithGIF";
import { MainLayout } from "./common/MainLayout/MainLayout";

export const ComponentWithSuspense = ({ children }) => {
  const renderLoader = () => {
    return (
      <MainLayout>
        <LoadingTextWithGIF>Loading app please wait ...</LoadingTextWithGIF>
      </MainLayout>
    );
  };

  return <Suspense fallback={renderLoader()}>{children}</Suspense>;
};
