import React, { useState } from "react";
import { Form } from "../common/FormContainer/FormContainer";
import { InputContainer } from "../common/InputContainer/InputContainer";
import { Input } from "../../components/common/Input/Input";
import { Label } from "../common/Label/Label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../common/Button/Button";
import { useAuth } from "../../hooks/auth/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { Link } from "react-router-dom";
import { setLocalStorageItem } from "../../utils/browser";
import { localPersist } from "../../utils/constants";
import { Card, CardContent } from "../ui/card";

export const SigInForm = ({ onSubmit }) => {
  const { setPersist } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });

  const [showPass, setshowPass] = useState(true);

  const emailErrMsg = errors.email?.message;
  const passwordErrMgs = errors.password?.message;

  const emailInputVal = watch("email");
  const passwordInputVal = watch("password");
  return (
    <div className="form_container mt-20">
      <Card className="md:max-w-[500px]  md:mx-auto mx-4">
        <CardContent className="p-0 pb-2 px-2">
          <Form
            onSubmit={handleSubmit((data) => onSubmit({ data, reset }))}
            className={``}
          >
            <Form.Header className={`mb-2`}>
              <h1 className="text-fs_4xl font-semibold">Sign In</h1>
              <p className="text-fs_base">
                don't have an account please{" "}
                <span>
                  <Link className="underline" to={"/signup"}>
                    Sign up
                  </Link>
                </span>
              </p>
            </Form.Header>
            <InputContainer className={`gap-0 relative`}>
              <Input
                type="text"
                id="email"
                {...register("email")}
                className={`${emailErrMsg ? `border-red-500` : ``} peer `}
              />
              <Label
                className={`text-sm bg-bg-primary absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 duration-300 ${
                  emailInputVal ? `-top-3` : `top-[5px]`
                } ${emailErrMsg ? `text-red-500` : ``} px-2`}
                htmlFor={`email`}
              >
                Email
              </Label>
              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {emailErrMsg}
              </ErrorText>
            </InputContainer>
            <InputContainer className={`gap-0 relative`}>
              <div className={`relative`}>
                <Input
                  type={showPass ? `password` : `text`}
                  id="password"
                  autoComplete={"true"}
                  className={`${
                    passwordErrMgs ? `border-red-500` : ``
                  } peer w-full bg`}
                  {...register("password")}
                />
                <Label
                  className={`text-sm bg-bg-primary absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3  duration-300 ${
                    passwordInputVal ? `-top-3` : `top-[5px]`
                  } ${passwordErrMgs ? `text-red-500` : ``} px-2`}
                  htmlFor={`email`}
                >
                  Password
                </Label>
                {showPass ? (
                  <FaRegEyeSlash
                    className="absolute bottom-[8px] right-[8px] cursor-pointer"
                    onClick={() => {
                      setshowPass(false);
                    }}
                  />
                ) : (
                  <FaRegEye
                    className="absolute bottom-[8px] right-[8px] cursor-pointer"
                    onClick={() => {
                      setshowPass(true);
                    }}
                  />
                )}
              </div>

              <ErrorText
                className={`${
                  passwordErrMgs ? `visible` : `invisible`
                } min-h-4`}
              >
                {passwordErrMgs}
              </ErrorText>
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
                />
                <span className="ml-1 text-fs_base"> Trust this device?</span>
              </Label>

              {errors.persist?.message && (
                <ErrorText>{errors.persist?.message}</ErrorText>
              )}
            </InputContainer>

            <Button className="border-none" varient={"success"}>
              Submit
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
