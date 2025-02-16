import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Label } from "../../components/Label/Label";
import { Form } from "../../components/FormContainer/FormContainer";
import { InputContainer } from "../../components/InputContainer/InputContainer";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { ErrorText } from "../../components/ErrorText/ErrorText";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema } from "./signUpFormSchema";

import { useSignup } from "../../services/auth/quries/useSignup";

import toast, { Toaster } from "react-hot-toast";
import { LoadingWithText } from "../../components/LoadingWithText/LoadingWithText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { format } from "date-fns";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpFormSchema) });
  // const { singUp, isPending } = useSignup();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const submitFormData = async (data) => {
    const formData = {
      ...data,
      registered_at: format(new Date(), "yyyy-MM-dd"),
    };
    console.log("formData submitFormData -==> ", formData);
    const res = await axiosPrivate.post(`/signup`, formData);
    return res;
  };

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (data) => {
      console.log("sinUpRes === >", data);
      toast.success(
        "Account successfully created. !!\n Please verify the new account from the user's email address."
      );
      queryClient.invalidateQueries({ queryKey: ["postSignUp"] });
    },
    onError: (err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unkown error occured !! `);
        console.log(err);
      }
    },
  });

  const onSubmit = (data) => {
    // singUp(data);
    signUp(data);

    console.log("Sigup data ===> ", data);

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
            <LoadingWithText text={`Submitting form please wait!`} />
          </>
        )}
      </MainLayout>
    </>
  );
};
