import React, {  useState } from "react";

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

export const SigInForm = ({ onSubmit }) => {
  const { persist, setPersist } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });

  const [showPass, setShowPass] = useState(true);

  const emailErrMsg = errors.email?.message;
  const passwordErrMgs = errors.password?.message;

  const { email, password } = getYupSchemaFields({
    schema: signInFormSchema,
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
              <h1 className="text-fs_4xl font-medium">Sign In</h1>
              
              <p className="text-fs_base md:hidden block">
                don't have an account please{" "}
                <span>
                  <Link className="underline" to={"/signup"}>
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
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="trust_device"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Trust this device
                </label>
              </div>
            </div>

           <div className="flex">
             <Button  className="border-none w-full" variant={"success"}>
              <span className="text-fs_xl">
                Sign in
              </span>
            </Button>
           </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
