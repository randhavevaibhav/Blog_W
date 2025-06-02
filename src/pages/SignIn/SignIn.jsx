import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { setLocalStorageItem } from "@/utils/browser";
import { localPersist } from "@/utils/constants";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

const SignIn = () => {
  const { signIn, isPending, isError, isSuccess } = useSignin();
  const { persist } = useAuth();

  const onSubmit = ({ data, reset }) => {
    signIn(data);
    setLocalStorageItem(localPersist, persist);
    reset();
  };

  if (isPending) {
    return (
      <MainLayout className="mb-0">
        <LoadingTextWithGIF>Signin in please wait...</LoadingTextWithGIF>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout className="mb-0">
        <ErrorText>Error in signin !!</ErrorText>
      </MainLayout>
    );
  }

  if (isSuccess) {
    return (
      <MainLayout className="mb-0">
        <LoadingTextWithGIF>Redirecting ...</LoadingTextWithGIF>
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
