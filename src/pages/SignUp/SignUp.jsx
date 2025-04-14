import { Link } from "react-router-dom";

import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignup } from "../../hooks/auth/useSignup";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import formBgImg from "../../assets/form_bg.jpg";
import { SignUpForm } from "../../components/SignUp/SignUpForm";
import { BgImage } from "../../components/common/Auth/BgImage";

const SignUp = () => {
  const { signUp, isPending } = useSignup();

  const onSubmit = ({ data, reset }) => {
    signUp(data);

    reset();
  };

  return (
    <>
      <MainLayout className={`mb-0`}>
        {isPending ? (
          <LoadingTextWithGIF>
            Submitting form please wait...
          </LoadingTextWithGIF>
        ) : (
          <div className="md:mt-0 mt-28  h-screen">
            <div className="flex gap-4 h-full ">
              <SignUpForm onSubmit={onSubmit} />
              <BgImage />
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default SignUp;
