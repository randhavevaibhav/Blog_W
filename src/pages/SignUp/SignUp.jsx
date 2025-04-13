import { Link } from "react-router-dom";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import { Label } from "../../components/common/Label/Label";
import { Form } from "../../components/common/FormContainer/FormContainer";
import { InputContainer } from "../../components/common/InputContainer/InputContainer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema } from "./signUpFormSchema";

import { useSignup } from "../../hooks/auth/useSignup";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpFormSchema) });

  const { signUp, isPending } = useSignup();

  const onSubmit = (data) => {
    signUp(data);

    //console.log("Sigup data ===> ", data);

    reset();
  };

  const firstNameErrMsg = errors.firstName?.message;
  const emailErrMsg = errors.email?.message;
  const passwordErrMsg = errors.password?.message;
  const confirmPassErrMsg = errors.confirmPassword?.message;

  const firstNameInputVal = watch("firstName");
  const emailInputVal = watch("email");
  const passwordInputVal = watch("password");
  const confirmPassInputVal = watch("confirmPassword");

  return (
    <>
      <MainLayout
        className={`flex flex-col items-center h-scminushdminusfoot justify-center md:mt-0`}
      >
        {isPending ? (
          <LoadingTextWithGIF>
            Submitting form please wait...
          </LoadingTextWithGIF>
        ) : (
          <div className="md:mt-10">
            <Form.Header>
              <h2 className="text-3xl">Sign Up From</h2>
              <p>
                Have an account please&nbsp;
                <span>
                  <Link className="underline" to={"/signin"}>
                    Log In
                  </Link>
                </span>
              </p>
            </Form.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputContainer className={`gap-0 relative`}>
                <Input
                  type="text"
                  {...register("firstName")}
                  id={`firstName`}
                  className={`${firstNameErrMsg ? `border-red-500` : ``} peer`}
                />
                <Label
                  className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                    firstNameInputVal ? `-top-3` : `top-[5px]`
                  } ${firstNameErrMsg ? `text-red-500` : ``} px-2`}
                  htmlFor={`firstName`}
                >
                  First Name
                </Label>

                <ErrorText
                  className={`${
                    firstNameErrMsg ? `visible` : `invisible`
                  } min-h-5`}
                >
                  {firstNameErrMsg}
                </ErrorText>
              </InputContainer>

              <InputContainer className={`gap-0 relative`}>
                <Input
                  type="text"
                  {...register("email")}
                  className={`${emailErrMsg ? `border-red-500` : ``} peer`}
                  id={`email`}
                />

                <Label
                  htmlFor={`email`}
                  className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                    emailInputVal ? `-top-3` : `top-[5px]`
                  } ${emailErrMsg ? `text-red-500` : ``} px-2`}
                >
                  Email
                </Label>

                <ErrorText
                  className={`${emailErrMsg ? `visible` : `invisible`} min-h-5`}
                >
                  {emailErrMsg}
                </ErrorText>
              </InputContainer>
              <InputContainer className={`gap-0 relative`}>
                <Input
                  type="password"
                  autoComplete={"true"}
                  {...register("password")}
                  className={`${passwordErrMsg ? `border-red-500` : ``} peer`}
                  id={`password`}
                />
                <Label
                  htmlFor={`password`}
                  className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                    passwordInputVal ? `-top-3` : `top-[5px]`
                  } ${passwordErrMsg ? `text-red-500` : ``} px-2`}
                >
                  Password
                </Label>

                <ErrorText
                  className={`${
                    passwordErrMsg ? `visible` : `invisible`
                  } min-h-5`}
                >
                  {passwordErrMsg}
                </ErrorText>
              </InputContainer>
              <InputContainer className={`gap-0 relative`}>
                <Input
                  type="password"
                  autoComplete={"true"}
                  {...register("confirmPassword")}
                  className={`${
                    confirmPassErrMsg ? `border-red-500` : ``
                  } peer`}
                  id={`confirmPassword`}
                />

                <Label
                  htmlFor={`confirmPassword`}
                  className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                    confirmPassInputVal ? `-top-3` : `top-[5px]`
                  } ${confirmPassErrMsg ? `text-red-500` : ``} px-2`}
                >
                  Confirm password
                </Label>

                <ErrorText
                  className={`${
                    confirmPassErrMsg ? `visible` : `invisible`
                  } min-h-5 mb-2`}
                >
                  {confirmPassErrMsg}
                </ErrorText>
              </InputContainer>
              <Button className="border-none" varient={"success"}>
                Submit
              </Button>
            </Form>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default SignUp;
