import { Suspense } from "react";
import { LoadingTextWithSpinner } from "./common/LoadingTextWithSpinner/LoadingTextWithSpinner";

export const ComponentWithSuspense = ({ children }) => {
  const renderLoader = () => {
    return <LoadingTextWithSpinner>Loading .....</LoadingTextWithSpinner>;
  };

  return <Suspense fallback={renderLoader()}>{children}</Suspense>;
};
