import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/useAuth";
import React, { forwardRef, memo, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {  userProfileSchema } from "../userProfileSchema";
import { getYupSchemaFields } from "@/utils/utils";

const { userName, userMail, oldPassword, password } =
  getYupSchemaFields({
    schema:userProfileSchema
  });
export const UserInfo = forwardRef(({ register, errors, watch }, ref) => {
  const [showPass, setshowPass] = useState(true);
  const [selectedProfImg, setSelectedProfImg] = useState(null);
  const { auth } = useAuth();
  const { userName: defaultUserName, userMail: defaultUserMail } = auth;

  const userNameVal = watch(userName.name);
  const userMailVal = watch(userMail.name);
  const passwordVal = watch(password.name);
  const oldPasswordVal = watch(oldPassword.name);

  const userNameErrMsg = errors.userName?.message;
  const userMailErrMsg = errors.userMail?.message;
  const passErrMsg = errors.password?.message;
  const oldPassErrMsg = errors.oldPassword?.message;

  const [charaCount, setCharaCount] = useState({
    userNameCharCount: 0,
    userEmailCharCount: 0,
    passCharCount: 0,
    oldPassCharCount: 0,
  });

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      userNameCharCount: userNameVal?.length,
    }));
  }, [userNameVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      userEmailCharCount: userMailVal?.length,
    }));
  }, [userMailVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      passCharCount: passwordVal?.length,
    }));
  }, [passwordVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      oldPassCharCount: oldPasswordVal?.length,
    }));
  }, [oldPasswordVal]);

  const handleImgChange = () => {
    const profileImgFile = ref.current.files ? ref.current.files[0] : null;

    if (profileImgFile) {
      setSelectedProfImg(profileImgFile.name);
    } else {
      setSelectedProfImg(null);
    }
  };

  return (
    <Card className="User_Info">
      <CardHeader>
        <CardTitle className="text-fs_xl">User info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="userName" className="!text-fs_base">
              User Name
            </Label>
            <Input
              id="userName"
              defaultValue={defaultUserName}
              {...register("userName")}
              className={` ${
                userNameErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
            />
            <div className="flex justify-between">
              <ErrorText
                className={`${
                  userNameErrMsg ? `visible` : `invisible`
                } min-h-4`}
              >
                {userNameErrMsg}
              </ErrorText>
              <span className="text-fs_small">
                {charaCount.userNameCharCount}/{userName.max}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="mail" className="!text-fs_base">
              Email
            </Label>
            <Input
              id="mail"
              defaultValue={defaultUserMail}
              {...register("userMail")}
              className={` ${
                userMailErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
            />
            <div className="flex justify-between">
              <ErrorText
                className={`${
                  userMailErrMsg ? `visible` : `invisible`
                } min-h-4`}
              >
                {userMailErrMsg}
              </ErrorText>

              <span className="text-fs_small">
                {charaCount.userEmailCharCount}/{userMail.max}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 relative">
            <Label htmlFor="oldPassword" className="!text-fs_base">
              Old password
            </Label>
            <Input
              id="oldPassword"
              type={showPass ? `password` : `text`}
              placeholder={`Old password`}
              {...register("oldPassword")}
              className={` ${
                oldPassErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
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
                className={`${oldPassErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {oldPassErrMsg}
              </ErrorText>
              <span className="text-fs_small">
                {charaCount.oldPassCharCount}/{oldPassword.max}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 relative">
            <Label htmlFor="password" className="!text-fs_base">
              Password
            </Label>
            <Input
              id="password"
              type={showPass ? `password` : `text`}
              placeholder={`New password`}
              {...register("password")}
              className={` ${
                passErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
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
                className={`${passErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {passErrMsg}
              </ErrorText>

              <span className="text-fs_small">
                {charaCount.passCharCount}/{password.max}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 space-y-1.8 mb-4">
            <Label htmlFor="profile_pic" className="!text-fs_base">
              Select profile image
            </Label>
            <div className="">
              <Label className={`cursor-pointer border p-2 rounded-md`}>
                select image
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute -left-[99999px]"
                  ref={ref}
                  onChange={handleImgChange}
                />
              </Label>
            </div>
            {selectedProfImg ? (
              <p className="text-fs_small truncate max-w-[10rem]">
                {selectedProfImg}
              </p>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
})
