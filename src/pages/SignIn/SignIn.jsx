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
      <MainLayout className={`mb-0`}>
        {isPending ? (
          <LoadingTextWithGIF>Signin in please wait...</LoadingTextWithGIF>
        ) : (
          <div className="md:mt-0 mt-28  h-screen">
            <div className="flex gap-4 h-full p-4 pb-0">
              <SigInForm onSubmit={onSubmit} />
              <BgImage />
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default SignIn;
