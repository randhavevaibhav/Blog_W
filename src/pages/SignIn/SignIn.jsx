import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { setLocalStorageItem } from "@/utils/browser";
import { localPersist } from "@/utils/constants";
import Loading from "../Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";

const SignIn = () => {
  const { signIn, isPending, isSuccess } = useSignin();
  const { persist, auth } = useAuth();
  const location = useLocation();

  if (auth.accessToken) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  if (isPending) {
    return <Loading>Sign in please wait...</Loading>;
  }

  //Error is handled in useSignin hook

  if (isSuccess) {
    return <Loading>Redirecting ...</Loading>;
  }

  const onSubmit = ({ data, reset }) => {
    const isPersist = persist ? true : false;

    signIn({ ...data, persist: isPersist });
    setLocalStorageItem(localPersist, persist);
    reset();
  };

  return (
    <>
      <MainLayout className={` min-h-0 mb-0 mt-10`}>
        <SigInForm onSubmit={onSubmit} />
      </MainLayout>
    </>
  );
};

export default SignIn;
