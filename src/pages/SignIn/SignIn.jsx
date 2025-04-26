import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { useSignin } from "../../hooks/auth/useSignin";

import { SigInForm } from "../../components/SignIn/SigInForm";
import { BgImage } from "../../components/common/Auth/BgImage";

const SignIn = () => {
  const { signIn, isPending, isError } = useSignin();

  const onSubmit = ({ data, reset }) => {
    // //console.log("data ==> ", data);
    signIn(data);

    reset();
  };

  return (
    <>
      <MainLayout className={``}>
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
