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
    <div className="form_container lg:w-1/2 w-full  md:p-8 md:mx-0 ">
      <Form
        onSubmit={handleSubmit((data) => onSubmit({ data, reset }))}
        className={`md:max-w-[500px] max-w-[320px] mx-auto  bg-bg-shade rounded-md`}
      >
        <Form.Header className={`mb-2`}>
          <h2 className="md:text-3xl text-2xl">Sign In</h2>
          <p>
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
            className={`${emailErrMsg ? `border-red-500` : ``} peer`}
          />
          <Label
            className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
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
              } peer w-full`}
              {...register("password")}
            />
            <Label
              className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
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
            className={`${passwordErrMgs ? `visible` : `invisible`} min-h-4`}
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
  );
};
