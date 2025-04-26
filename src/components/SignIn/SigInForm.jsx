import React, { useState } from "react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../common/Button/Button";
import { useAuth } from "../../hooks/auth/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { Link } from "react-router-dom";

import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

export const SigInForm = ({ onSubmit }) => {
  const { persist, setPersist } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInFormSchema) });

  const [showPass, setshowPass] = useState(true);

  console.log("persist ===> ", persist);

  const emailErrMsg = errors.email?.message;
  const passwordErrMgs = errors.password?.message;

  return (
    <div className="form_container mt-20 p-3">
      <Card className="max-w-[500px]  mx-auto">
        <CardContent className="p-0 pb-4 px-4">
          <form
            onSubmit={handleSubmit((data) => onSubmit({ data, reset }))}
            className={``}
          >
            {/* title */}
            <header className="mb-4 text-center">
              <h1 className="text-fs_4xl font-semibold">Sign In</h1>
              <p className="text-fs_base">
                don't have an account please{" "}
                <span>
                  <Link className="underline" to={"/signup"}>
                    Sign up
                  </Link>
                </span>
              </p>
            </header>
            <div className="flex flex-col space-y-1.5 ">
              <Label className={``}>Email</Label>
              <Input
                type="text"
                id="email"
                {...register("email")}
                className={` ${
                  emailErrMsg ? `focus-visible:ring-0 border-red-500` : ``
                } `}
              />

              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {emailErrMsg}
              </ErrorText>
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label className={``} htmlFor={`password`}>
                Password
              </Label>
              <Input
                type={showPass ? `password` : `text`}
                id="password"
                autoComplete={"true"}
                className={`${
                  passwordErrMgs ? `focus-visible:ring-0 border-red-500` : ``
                } `}
                {...register("password")}
              />

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

              <ErrorText
                className={`${
                  passwordErrMgs ? `visible` : `invisible`
                } min-h-4`}
              >
                {passwordErrMgs}
              </ErrorText>
            </div>

            <div className="items-top flex space-x-2 mb-4">
              <Checkbox
                id="trust_device"
                checked={persist}
                onCheckedChange={(checked) => {
                  console.log("calling onCheckedChange ==>", persist);
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

            <Button className="border-none" varient={"success"}>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
