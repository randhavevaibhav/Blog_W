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

import { Toaster } from "react-hot-toast";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpFormSchema) });

  const { signUp, isPending } = useSignup();

  const onSubmit = (data) => {
    signUp(data);

    //console.log("Sigup data ===> ", data);

    reset();
  };

  return (
    <>
      <MainLayout
        className={`flex flex-col items-center h-scminushdminusfoot justify-center`}
      >
        <div className="md:mt-10">
          <Form.Header>
            <h2 className="text-3xl">Sign Up From</h2>
            <p>
              Have an account please{" "}
              <span>
                <Link className="underline" to={"/signin"}>
                  Log In
                </Link>
              </span>
            </p>
          </Form.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label isRequired={true} className={`text-sm`}>
                First Name:
              </Label>
              <Input
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
              />
              {errors.firstName?.message && (
                <ErrorText>{errors.firstName?.message}</ErrorText>
              )}
            </InputContainer>

            <InputContainer>
              <Label isRequired={true} className={`text-sm`}>
                Email
              </Label>
              <Input
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email?.message && (
                <ErrorText>{errors.email?.message}</ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <Label isRequired={true} className={`text-sm`}>
                Password
              </Label>
              <Input
                type="password"
                placeholder="Enter password"
                autoComplete={"true"}
                {...register("password")}
              />
              {errors.password?.message && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
            </InputContainer>
            <InputContainer>
              <Label isRequired={true} className={`text-sm`}>
                Confirm password
              </Label>
              <Input
                type="password"
                placeholder="Confirm password"
                autoComplete={"true"}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword?.message && (
                <ErrorText>{errors.confirmPassword?.message}</ErrorText>
              )}
            </InputContainer>
            <Button className="border-none" varient={"success"}>
              Submit
            </Button>
          </Form>
        </div>

        <Toaster />
        {isPending && (
          <>
            <LoadingWithText>Submitting form please wait...</LoadingWithText>
          </>
        )}
      </MainLayout>
    </>
  );
};
