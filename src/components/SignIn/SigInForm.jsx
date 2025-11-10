import React, { useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useAuth } from "../../hooks/auth/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { Link } from "react-router-dom";

import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { getYupSchemaFields } from "@/utils/utils";
import { Button } from "../ui/button";

import SiteLogo from "../common/SiteLogo/SiteLogo";

export const SigInForm = ({ onSubmit }) => {
  const { persist, setPersist } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });

  const [showPass, setShowPass] = useState(true);

  const emailErrMsg = errors.email?.message;
  const passwordErrMgs = errors.password?.message;

  const { email, password } = getYupSchemaFields({
    schema: signInFormSchema,
  });

  return (
    <div className="form_container p-3 max-w-[400px]  mx-auto">
      <header className="flex flex-col gap-4 items-center mb-4 text-center">
        <SiteLogo />
        <h1 className="text-fs_3xl font-medium ">Sign in</h1>
        <p className="text-fs_base">
          don't have an account please{" "}
          <span>
            <Link
              className="underline"
              to={"/signup"}
              data-test={`signup-link`}
            >
              Sign up
            </Link>
          </span>
        </p>
      </header>
      <Card className="">
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit((data) => onSubmit({ data, reset }))}
            className={``}
          >
            {/* title */}

            <div className="flex flex-col space-y-1.5">
              <Label className={``} htmlFor={email.name}>
                <span className="text-red-500 mr-1">*</span>Email
              </Label>
              <Input
                type="text"
                id={email.name}
                {...register(email.name)}
                className={` ${
                  emailErrMsg ? `focus-visible:ring-0 border-red-500` : ``
                } transition-none`}
                data-test={`email-input`}
                autoFocus={true}
              />

              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-4`}
                data-test={`email-error`}
              >
                {emailErrMsg}
              </ErrorText>
            </div>
            <div className="flex flex-col space-y-1.5 relative mt-1">
              <Label className={``} htmlFor={password.name}>
                <span className="text-red-500 mr-1">*</span>Password
              </Label>
              <Input
                type={showPass ? `password` : `text`}
                id={password.name}
                autoComplete={"true"}
                className={`${
                  passwordErrMgs ? `focus-visible:ring-0 border-red-500` : ``
                } transition-none`}
                {...register(password.name)}
                data-test={`password-input`}
              />

              {showPass ? (
                <FaRegEyeSlash
                  className="absolute top-[23px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setShowPass(false);
                  }}
                />
              ) : (
                <FaRegEye
                  className="absolute top-[23px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setShowPass(true);
                  }}
                />
              )}

              <ErrorText
                className={`${
                  passwordErrMgs ? `visible` : `invisible`
                } min-h-2`}
                data-test={`password-error`}
              >
                {passwordErrMgs}
              </ErrorText>
            </div>

            <div className="flex space-x-2 mb-4 mt-1">
              <Checkbox
                id="trust_device"
                checked={persist}
                onCheckedChange={(checked) => {
                  setPersist((prev) => !prev);
                }}
                data-test={`persist-login-check`}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="trust_device"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Trust this device
                </label>
              </div>
            </div>

            <div className="flex">
              <Button
                className="border-none w-full"
                variant={"success"}
                data-test={`signin-button`}
              >
                <span className="text-fs_xl">Sign in</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
