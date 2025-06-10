import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { setLocalStorageItem } from "@/utils/browser";
import { localPersist } from "@/utils/constants";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";


const SignIn = () => {
  const { signIn, isPending, isSuccess } = useSignin();
  const { persist } = useAuth();

  const onSubmit = ({ data, reset }) => {
    const isPersist = persist ? true : false;

    signIn({ ...data, persist: isPersist });
    setLocalStorageItem(localPersist, persist);
    reset();
  };

  if (isPending) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Sigin in please wait...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

//Error is handled in useSignin hook

  if (isSuccess) {
    return (
      <MainLayout className="mb-0">
        <LoadingTextWithSpinner>Redirecting ...</LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout className={`mb-0`}>
        <SigInForm onSubmit={onSubmit} />
        
      </MainLayout>
    </>
  );
};

export default SignIn;
