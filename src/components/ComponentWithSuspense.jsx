import { Suspense } from "react";

import { MainLayout } from "./common/MainLayout/MainLayout";
import { LoadingTextWithSpinner } from "./common/LoadingTextWithSpinner/LoadingTextWithSpinner";

export const ComponentWithSuspense = ({ children }) => {
  const renderLoader = () => {
    return (
   
            <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
              <LoadingTextWithSpinner direction="center">Loading ...</LoadingTextWithSpinner>
            </MainLayout>
        
    );
  };

  return <Suspense fallback={renderLoader()}>{children}</Suspense>;
};
