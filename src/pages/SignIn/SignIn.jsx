import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { setLocalStorageItem } from "@/utils/browser";
import { localPersist } from "@/utils/constants";
import Loading from "../Loading/Loading";

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
    return <Loading>Sigin in please wait...</Loading>;
  }

  //Error is handled in useSignin hook

  if (isSuccess) {
    return <Loading>Redirecting ...</Loading>;
  }

  return (
    <>
      <MainLayout className={` min-h-0 mb-0`}>
        <SigInForm onSubmit={onSubmit} />
      </MainLayout>
    </>
  );
};

export default SignIn;
