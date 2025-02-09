import { Link } from "react-router-dom";
import { Input } from "../../comonents/Input/Input";
import { Button } from "../../comonents/Button/Button";
import { Label } from "../../comonents/Label/Label";
import { Form } from "../../comonents/FormContainer/FormContainer";
import { InputContainer } from "../../comonents/InputContainer/InputContainer";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { ErrorText } from "../../comonents/ErrorText/ErrorText";
import { useSignin } from "../../quries/auth/signin/useSignin";
import { Toaster } from "react-hot-toast";
import { LoadingWithText } from "../../comonents/LoadingWithText/LoadingWithText";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });
  const { singIn, isPending } = useSignin();

  const onSubmit = (data) => {
    // console.log("data ==> ", data);
    singIn(data);

    reset();
  };
  return (
    <>
      <MainLayout
        className={`flex flex-col items-center justify-center h-screen mt-3`}
      >
        <div className="">
          <Form.Header>
            <h2 className="text-3xl">Sign In From</h2>
            <p>
              don't have an account please{" "}
              <span>
                <Link className="underline" to={"/signup"}>
                  Sign up
                </Link>
              </span>
            </p>
          </Form.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label isRequired={true}>Email</Label>
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
              <Label isRequired={true}>Password</Label>
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
            <Button className="border-none" varient={"success"}>
              Submit
            </Button>
          </Form>
        </div>
        <Toaster />
        {isPending && <LoadingWithText text={`Signin in please wait !`} />}
      </MainLayout>
    </>
  );
};
