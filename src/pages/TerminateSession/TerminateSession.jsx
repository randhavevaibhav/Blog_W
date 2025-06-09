import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { TerminateSessionForm } from "@/components/TerminateSession/TerminateSessionForm";
import { useTerminate } from "@/hooks/auth/useTerminate";
import React from "react";

const TerminateSession = () => {
  const { isError, isPending, isSuccess,terminate } = useTerminate();

  const onSubmit = ({ data, reset }) => {
    terminate(data)
    reset();
    
  };
  if (isError) {
    return (
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0`}>
        <ErrorText>Error while terminating session.</ErrorText>
      </MainLayout>
    );
  }

   if (isPending) {
    return (
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0`}>
        <LoadingTextWithSpinner>Loading ....</LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  if (isSuccess) {
    return (
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0`}>
        <LoadingTextWithSpinner>Redirecting ....</LoadingTextWithSpinner>
      </MainLayout>
    );
  }
  return (
    <MainLayout className={` md:mx-auto max-w-[1380px] mb-0`}>
      <TerminateSessionForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default TerminateSession;
