import React, { useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { terminateSessionFormSchema } from "./terminateSessionFormSchema";
import { Link } from "react-router-dom";

import { Card, CardContent } from "../ui/card";

import { getYupSchemaFields } from "@/utils/utils";
import { Button } from "../ui/button";
import { getSignupPageLink } from "@/utils/getLinks";

export const TerminateSessionForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(terminateSessionFormSchema) });
    const [showPass, setshowPass] = useState(true);
  

  const emailErrMsg = errors.email?.message;
  const passwordErrMgs = errors.password?.message;

  const { email, password } = getYupSchemaFields({
    schema: terminateSessionFormSchema,
  });

  return (
    <div className="form_container p-3">
      <Card className="max-w-[500px]  mx-auto">
        <CardContent className="p-0 pb-4 px-4">
          <form
            onSubmit={handleSubmit((data) => onSubmit({ data, reset }))}
            className={``}
          >
            {/* title */}
            <header className="mb-4 text-center">
              <h1 className="text-fs_4xl font-medium">Terminate Session</h1>
              <p className="text-fs_base">
                don't have an account please{" "}
                <span>
                  <Link className="underline" to={getSignupPageLink()}>
                    Sign up
                  </Link>
                </span>
              </p>
            </header>
            <div className="flex flex-col space-y-1.5">
              <Label className={``} htmlFor={email.name}>
                Email
              </Label>
              <Input
                type="text"
                id={email.name}
                {...register(email.name)}
                className={` ${
                  emailErrMsg ? `focus-visible:ring-0 border-red-500` : ``
                } transition-none`}
                 data-test={`terminate-email-input`}
              />

              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {emailErrMsg}
              </ErrorText>
            </div>
            <div className="flex flex-col space-y-1.5 relative mt-1">
              <Label className={``} htmlFor={password.name}>
                Password
              </Label>
              <Input
                type={showPass ? `password` : `text`}
                id={password.name}
                autoComplete={"true"}
                className={`${
                  passwordErrMgs ? `focus-visible:ring-0 border-red-500` : ``
                } transition-none`}
                {...register(password.name)}
                 data-test={`terminate-password-input`}
              />

              {showPass ? (
                <FaRegEyeSlash
                  className="absolute top-[23px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setshowPass(false);
                  }}
                />
              ) : (
                <FaRegEye
                  className="absolute top-[23px] right-[10px] cursor-pointer"
                  onClick={() => {
                    setshowPass(true);
                  }}
                />
              )}

              <ErrorText
                className={`${
                  passwordErrMgs ? `visible` : `invisible`
                } min-h-2`}
              >
                {passwordErrMgs}
              </ErrorText>
            </div>

            <Button className="border-none mt-1" variant={"destructive"} data-test={`terminate-session-btn`}>
              Terminate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
