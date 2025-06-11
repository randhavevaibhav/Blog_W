import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ErrorText } from "../common/ErrorText/ErrorText";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "./signUpFormSchema";
import { Card, CardContent } from "../ui/card";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { getYupSchemaFields } from "@/utils/utils";
import { Button } from "../ui/button";
import { UserAvatar } from "../common/UserAvatar/UserAvatar";

const { firstName, email, password, confirmPassword } = getYupSchemaFields({
  schema: signUpFormSchema,
});

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

  const firstNameVal = watch(firstName.name);
  const emailVal = watch(email.name);
  const passwordVal = watch(password.name);

  const profileImgRef = useRef(null);
  const [selectedProfImg, setSelectedProfImg] = useState(null);
  const [showPass, setshowPass] = useState(true);

  const [charaCount, setCharaCount] = useState({
    firstNameCharCount: 0,
    emailCharCount: 0,
    passwordCharCount: 0,
  });

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      firstNameCharCount: firstNameVal?.length,
    }));
  }, [firstNameVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      emailCharCount: emailVal?.length,
    }));
  }, [emailVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      passwordCharCount: passwordVal?.length,
    }));
  }, [passwordVal]);

  const handleImgChange = () => {
    const profileImgFile = profileImgRef.current.files
      ? profileImgRef.current.files[0]
      : null;

    if (profileImgFile) {
      setSelectedProfImg(profileImgFile);
    } else {
      setSelectedProfImg(null);
    }
  };

  return (
    <div className="form_container p-3">
      <Card className="max-w-[500px]  mx-auto">
        <CardContent className="p-0 pb-4 px-4">
          <form
            onSubmit={handleSubmit((data) =>
              onSubmit({ data, reset, profileImgRef })
            )}
            className={``}
          >
            <header className="mb-4 text-center">
              <h1 className="text-fs_4xl font-medium">Sign Up</h1>
              <p className="text-fs_base">
                have an account please&nbsp;
                <span>
                  <Link className="underline" to={"/signin"}>
                    Sign in 
                  </Link>
                </span>
              </p>
            </header>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor={firstName.name}>First name</Label>
              <Input
                type="text"
                {...register(firstName.name)}
                id={firstName.name}
                className={`${
                  firstNameErrMsg ? `focus-visible:ring-0 border-red-500` : ``
                } transition-none`}
              />
              <div className="flex justify-between">
                <ErrorText
                  className={`${
                    firstNameErrMsg ? `visible` : `invisible`
                  } min-h-5`}
                >
                  {firstNameErrMsg}
                </ErrorText>
                <span className="text-fs_small">
                  {charaCount.firstNameCharCount}/{firstName.max}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-1.5 mt-1">
              <Label htmlFor={email.name}>Email</Label>
              <Input
                type="text"
                {...register(email.name)}
                className={`${
                  emailErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                } transition-none`}
                id={email.name}
              />
              <div className="flex justify-between">
                <ErrorText
                  className={`${emailErrMsg ? `visible` : `invisible`} min-h-5`}
                >
                  {emailErrMsg}
                </ErrorText>
                <span className="text-fs_small">
                  {charaCount.emailCharCount}/{email.max}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 relative mt-1">
              <Label htmlFor={password.name}>Password</Label>
              <Input
                type={showPass ? `password` : `text`}
                autoComplete={"true"}
                {...register(password.name)}
                className={`${
                  passwordErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                } transition-none`}
                id={password.name}
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
              <div className="flex justify-between">
                <ErrorText
                  className={`${
                    passwordErrMsg ? `visible` : `invisible`
                  } min-h-5`}
                >
                  {passwordErrMsg}
                </ErrorText>
                <span className="text-fs_small">
                  {charaCount.passwordCharCount}/{password.max}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 relative mt-1">
              <Label htmlFor={confirmPassword.name}>Confirm password</Label>
              <Input
                type={showPass ? `password` : `text`}
                autoComplete={"true"}
                {...register(confirmPassword.name)}
                className={`${
                  confirmPassErrMsg ? `border-red-500 focus-visible:ring-0` : ``
                } transition-none`}
                id={confirmPassword.name}
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

          <div className={`profile_img_div grid ${selectedProfImg?`grid-cols-[50px_auto]`:`grid-cols-1`} items-center gap-4`}>
             {selectedProfImg ? <UserAvatar userProfileImg={URL.createObjectURL(selectedProfImg)} /> : null}
              <div className="my-4 border border-bg-shade py-3  rounded-md ">
              <Label
                className={
                  " w-full flex justify-center cursor-pointer"
                }
              >
                <span className="text-fs_lg">{selectedProfImg?`Change profile picture`:`Add profile picture`}</span>
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute -left-[99999px]"
                  ref={profileImgRef}
                  onChange={handleImgChange}
                />
              </Label>
              
            </div>
           
           
          </div>
             <div>
               <Button className="border-none w-full" variant={"success"} >
              <span className="text-fs_xl">Sign up</span>
            </Button>
             </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
