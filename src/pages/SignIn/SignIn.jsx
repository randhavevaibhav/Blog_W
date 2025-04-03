import { Link } from "react-router-dom";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import { Label } from "../../components/common/Label/Label";
import { Form } from "../../components/common/FormContainer/FormContainer";
import { InputContainer } from "../../components/common/InputContainer/InputContainer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { useAuth } from "../../hooks/auth/useAuth";

import { setLocalStorageItem } from "../../utils/browser";
import { useSignin } from "../../hooks/auth/useSignin";
import { localPersist } from "../../utils/constants";
import { useState } from "react";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
 const SignIn = () => {
  const { setAuth, setPersist } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });

  const { signIn, isPending, isError } = useSignin();
  const [showPass, setshowPass] = useState(true);

  const onSubmit = (data) => {
    // //console.log("data ==> ", data);
    signIn(data);

    reset();
  };


  return (
    <>
      <MainLayout
        className={`flex flex-col items-center h-scminushdminusfoot justify-center mt-0`}
      >
        {isPending ? (
          <LoadingTextWithGIF>Signin in please wait...</LoadingTextWithGIF>
        ) : (
          <div className="duration-150">
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
              <InputContainer >
                <Label isRequired={true}>Password</Label>
                <div className={`relative`}> 

                <Input
                  type={showPass ? `password` : `text`}
                  placeholder="Enter password"
                  autoComplete={"true"}
                  className={`w-full`}
                  {...register("password")}
                />
                {showPass ? (
                  <FaRegEyeSlash
                    className="absolute bottom-[8px] right-[8px] cursor-pointer"
                    onClick={() =>{
                      setshowPass(false)
                    }}
                  />
                ) : (
                  <FaRegEye
                    className="absolute bottom-[8px] right-[8px] cursor-pointer"
                    onClick={() => {setshowPass(true)}}
                  />
                )}
                </div>
              
                {errors.password?.message && (
                  <ErrorText>{errors.password?.message}</ErrorText>
                )}
              </InputContainer>
              <InputContainer className={`flex-row justify-normal`}>
                <Label isRequired={true} className={`cursor-pointer`}>
                  <Input
                    type="checkbox"
                    id="persist"
                    className=""
                    onClick={(e) => {
                      setLocalStorageItem(localPersist, e.target.checked);
                      setPersist(e.target.checked);
                    }}
                    {...register("persist")}
                  />
                  <span className="ml-1"> Trust this device?</span>
                </Label>

                {errors.persist?.message && (
                  <ErrorText>{errors.persist?.message}</ErrorText>
                )}
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


export default SignIn;