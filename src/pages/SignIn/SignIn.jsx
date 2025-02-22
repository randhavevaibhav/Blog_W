import { Link} from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { Form } from "../../components/FormContainer/FormContainer";
import { InputContainer } from "../../components/InputContainer/InputContainer";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { ErrorText } from "../../components/ErrorText/ErrorText";

import  { Toaster } from "react-hot-toast";
import { LoadingWithText } from "../../components/LoadingWithText/LoadingWithText";

import { useAuth } from "../../hooks/auth/useAuth";

import { setLocalStorageItem } from "../../utils/browser";
import { useSignin } from "../../hooks/auth/useSignin";

export const SignIn = () => {
 
  const { setAuth, setPersist } = useAuth();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });
 

 const {signIn,isPending} = useSignin();

  const onSubmit = (data) => {
    // //console.log("data ==> ", data);
    signIn(data);

    reset();
  };

  return (
    <>
      <MainLayout
        className={`flex flex-col items-center h-scminushdminusfoot justify-center `}
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
            <InputContainer className={`flex-row justify-normal`}>
              <Input
                type="checkbox"
                id="persist"
                onClick={(e) => {
                  setLocalStorageItem("persist", e.target.checked);
                  setPersist(e.target.checked);
                }}
                {...register("persist")}
              />
              <Label isRequired={true}>Trust is device?</Label>

              {errors.persist?.message && (
                <ErrorText>{errors.persist?.message}</ErrorText>
              )}
            </InputContainer>
            <Button className="border-none" varient={"success"}>
              Submit
            </Button>
          </Form>
        </div>
        <Toaster />
        {isPending && <LoadingWithText >Signin in please wait...</LoadingWithText>}
      </MainLayout>
    </>
  );
};
