import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { InputContainer } from "../common/InputContainer/InputContainer";
import { Input } from "../common/Input/Input";
import { Label } from "../common/Label/Label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./signUpFormSchema";
import { Button } from "../common/Button/Button";
import { Form } from "../common/FormContainer/FormContainer";
import { Card, CardContent } from "../ui/card";

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
    <div className="form_container mt-20">
      <Card className="md:max-w-[500px]  md:mx-auto mx-4">
        <CardContent className="p-0 pb-2 px-2">
          <Form
            onSubmit={handleSubmit((data) =>
              onSubmit({ data, reset, profileImgRef })
            )}
            className={``}
          >
            <Form.Header className={`mb-4 text-center `}>
              <h1 className="text-fs_4xl font-semibold">Sign Up</h1>
              <p className="text-fs_base">
                Have an account please&nbsp;
                <span>
                  <Link className="underline" to={"/signin"}>
                    Log In
                  </Link>
                </span>
              </p>
            </Form.Header>
            <InputContainer className={`gap-0 relative`}>
              <Input
                type="text"
                {...register("firstName")}
                id={`firstName`}
                className={`${firstNameErrMsg ? `border-red-500` : ``} peer`}
              />
              <Label
                className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                  firstNameInputVal ? `-top-3` : `top-[5px]`
                } ${firstNameErrMsg ? `text-red-500` : ``} px-2`}
                htmlFor={`firstName`}
              >
                First Name
              </Label>

              <ErrorText
                className={`${
                  firstNameErrMsg ? `visible` : `invisible`
                } min-h-5`}
              >
                {firstNameErrMsg}
              </ErrorText>
            </InputContainer>

            <InputContainer className={`gap-0 relative`}>
              <Input
                type="text"
                {...register("email")}
                className={`${emailErrMsg ? `border-red-500` : ``} peer`}
                id={`email`}
              />

              <Label
                htmlFor={`email`}
                className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                  emailInputVal ? `-top-3` : `top-[5px]`
                } ${emailErrMsg ? `text-red-500` : ``} px-2`}
              >
                Email
              </Label>

              <ErrorText
                className={`${emailErrMsg ? `visible` : `invisible`} min-h-5`}
              >
                {emailErrMsg}
              </ErrorText>
            </InputContainer>
            <InputContainer className={`gap-0 relative`}>
              <Input
                type="password"
                autoComplete={"true"}
                {...register("password")}
                className={`${passwordErrMsg ? `border-red-500` : ``} peer`}
                id={`password`}
              />
              <Label
                htmlFor={`password`}
                className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                  passwordInputVal ? `-top-3` : `top-[5px]`
                } ${passwordErrMsg ? `text-red-500` : ``} px-2`}
              >
                Password
              </Label>

              <ErrorText
                className={`${
                  passwordErrMsg ? `visible` : `invisible`
                } min-h-5`}
              >
                {passwordErrMsg}
              </ErrorText>
            </InputContainer>
            <InputContainer className={`gap-0 relative`}>
              <Input
                type="password"
                autoComplete={"true"}
                {...register("confirmPassword")}
                className={`${confirmPassErrMsg ? `border-red-500` : ``} peer`}
                id={`confirmPassword`}
              />

              <Label
                htmlFor={`confirmPassword`}
                className={`text-sm  absolute left-1 top-[5px] text-gray-400 peer-focus:-top-3 bg-bg-primary duration-300 ${
                  confirmPassInputVal ? `-top-3` : `top-[5px]`
                } ${confirmPassErrMsg ? `text-red-500` : ``} px-2`}
              >
                Confirm password
              </Label>

              <ErrorText
                className={`${
                  confirmPassErrMsg ? `visible` : `invisible`
                } min-h-5 mb-2`}
              >
                {confirmPassErrMsg}
              </ErrorText>
            </InputContainer>

            <div>
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
