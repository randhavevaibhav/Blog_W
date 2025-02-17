import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useSignin } from "../../services/auth/quries/useSignin";
import toast, { Toaster } from "react-hot-toast";
import { LoadingWithText } from "../../components/LoadingWithText/LoadingWithText";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { setLocalStorageItem } from "../../utils/browser";

export const SignIn = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setAuth, persist, setPersist } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });
  // const { singIn, isPending } = useSignin();

  const submitFormData = async (data) => {
    console.log("data submitFormData -==> ", data);
    const res = await axiosPrivate.post(`/signin`, data);
    return res;
  };

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (res) => {
      const accessToken = res.data.accessToken;
      const userId = res.data.userId;

      console.log("res.data.accessToken ==> ", res.data.accessToken);

      toast.success("Login successfull !");
      setAuth({
        userId,
        accessToken,
      });
      navigate(from, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
    },
    onError: (err) => {
      console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
        toast.error(`${responseError}`);
      } else {
        toast.error(err.message);
      }
    },
  });

  const onSubmit = (data) => {
    // console.log("data ==> ", data);
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
        {isPending && <LoadingWithText text={`Signin in please wait !`} />}
      </MainLayout>
    </>
  );
};
