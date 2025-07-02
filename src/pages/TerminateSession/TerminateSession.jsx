import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { TerminateSessionForm } from "@/components/TerminateSession/TerminateSessionForm";
import { useTerminate } from "@/hooks/auth/useTerminate";
import React from "react";
import Loading from "../Loading/Loading";

const TerminateSession = () => {
  const { isError, isPending, isSuccess,terminate } = useTerminate();

  const onSubmit = ({ data, reset }) => {
    terminate(data)
    reset();
    
  };
  //Error handled in useTerminate hook

   if (isPending) {
    return (
      <Loading>
        Loading ....
      </Loading>
    );
  }

  if (isSuccess) {
    return (
     <Loading>
      Redirecting ....
     </Loading>
    );
  }
  return (
    <MainLayout className={` md:mx-auto max-w-[1380px] mb-0`}>
      <TerminateSessionForm onSubmit={onSubmit} />
    </MainLayout>
  );
};

export default TerminateSession;
