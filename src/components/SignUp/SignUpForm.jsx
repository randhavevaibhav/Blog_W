import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { InputContainer } from "../common/InputContainer/InputContainer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./signUpFormSchema";
import { Button } from "../common/Button/Button";
import { Form } from "../common/FormContainer/FormContainer";
import { Card, CardContent } from "../ui/card";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const SignUpForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpFormSchema) });

  const firstNameErrMsg = errors.firstName?.message;
  const emailErrMsg = errors.email?.message;
  const passwordErrMsg = errors.password?.message;
  const confirmPassErrMsg = errors.confirmPassword?.message;

  const profileImgRef = useRef(null);
  const [selectedProfImg, setSelectedProfImg] = useState(null);
  const [showPass, setshowPass] = useState(true);
  const firstNameInputVal = watch("firstName");
  const emailInputVal = watch("email");
  const passwordInputVal = watch("password");
  const confirmPassInputVal = watch("confirmPassword");

  const handleImgChange = () => {
    const profileImgFile = profileImgRef.current.files
      ? profileImgRef.current.files[0]
      : null;

    if (profileImgFile) {
      setSelectedProfImg(profileImgFile.name);
    } else {
      setSelectedProfImg(null);
    }
  };

  return (
    <div className="form_container mt-20 p-3">
      <Card className="max-w-[500px]  mx-auto">
        <CardContent className="p-0 pb-4 px-4">
          <form
            onSubmit={handleSubmit((data) =>
              onSubmit({ data, reset, profileImgRef })
            )}
            className={``}
          >
            <header className="mb-4 text-center">
              <h1 className="text-fs_4xl font-semibold">Sign Up</h1>
              <p className="text-fs_base">
                Have an account please&nbsp;
                <span>
                  <Link className="underline" to={"/signin"}>
                    Log In
                  </Link>
                </span>
              </p>
            </header>
            <div className="flex flex-col space-y-1.5 ">
              <Label>First name</Label>
              <Input
                type="text"
                {...register("firstName")}
                id={`firstName`}
                className={`${
                  firstNameErrMsg ? `focus-visible:ring-0 border-red-500` : ``
                }`}
              />

              <ErrorText
                className={`${
                  firstNameErrMsg ? `visible` : `invisible`
                } min-h-5`}
              >
                {firstNameErrMsg}
              </ErrorText>
            </div>

            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor={`email`}>Email</Label>
              <Input
                type="text"
                {...register("email")}
                className={`${
                  emailErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                }`}
                id={`email`}
              />

              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-5`}
              >
                {emailErrMsg}
              </ErrorText>
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor={`password`}>Password</Label>
              <Input
                type={showPass ? `password` : `text`}
                autoComplete={"true"}
                {...register("password")}
                className={`${
                  passwordErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                }`}
                id={`password`}
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
                  passwordErrMsg ? `visible` : `invisible`
                } min-h-5`}
              >
                {passwordErrMsg}
              </ErrorText>
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor={`confirmPassword`}>Confirm password</Label>
              <Input
                type={showPass ? `password` : `text`}
                autoComplete={"true"}
                {...register("confirmPassword")}
                className={`${
                  confirmPassErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                }`}
                id={`confirmPassword`}
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
                  confirmPassErrMsg ? `visible` : `invisible`
                } min-h-5 mb-2`}
              >
                {confirmPassErrMsg}
              </ErrorText>
            </div>

            <div className="my-4">
              <Label
                className={
                  "cursor-pointer border border-black dark:border-white rounded-md px-4 py-1 text-sm"
                }
              >
                {`Add picture`}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute -left-[99999px]"
                  ref={profileImgRef}
                  onChange={handleImgChange}
                />
              </Label>
              {selectedProfImg ? <p>{selectedProfImg}</p> : null}
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
