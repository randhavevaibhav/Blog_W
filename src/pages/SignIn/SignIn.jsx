import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { setLocalStorageItem } from "@/utils/browser";
import { localPersist } from "@/utils/constants";


const SignIn = () => {
  const { signIn, isPending, isError } = useSignin();
  const {persist } = useAuth();

  const onSubmit = ({ data, reset }) => {
    signIn(data);
    setLocalStorageItem(localPersist, persist);
    reset();
  };

  return (
    <>
      <MainLayout className={`mb-0`}>
        {isPending ? (
          <LoadingTextWithGIF>Signin in please wait...</LoadingTextWithGIF>
        ) : (
          <SigInForm onSubmit={onSubmit} />
        )}
      </MainLayout>
    </>
  );
};

export default SignIn;
