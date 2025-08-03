import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/useAuth";
import React, { forwardRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { userProfileSchema } from "../userProfileSchema";
import { getYupSchemaFields } from "@/utils/utils";
import { FormField } from "../FormField/FormField";
import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar";
import { Button } from "@/components/ui/button";

const { userName, userMail, oldPassword, password } = getYupSchemaFields({
  schema: userProfileSchema,
});
export const UserInfo = forwardRef(({ register, errors, watch }, ref) => {
  const [showPass, setShowPass] = useState(false);
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

  const handleImgChange = () => {
    const profileImgFile = ref.current.files ? ref.current.files[0] : null;

    if (profileImgFile) {
      setSelectedProfImg(profileImgFile);
    } else {
      setSelectedProfImg(null);
    }
  };

  return (
    <Card className="User_Info">
      <CardHeader className={`md:pt-6 pt-4 pb-0 md:px-6 px-4`}>
        <CardTitle className="text-fs_2xl font-extrabold">User info</CardTitle>
      </CardHeader>
      <CardContent className={`md:p-6 pt-0 p-4`}>
        <div className="grid w-full items-center gap-2">
          <FormField>
            <FormField.FormLabel isRequired={true}>
              User name
            </FormField.FormLabel>
            <FormField.FormInput
              id={userName.name}
              register={register}
              errorMsg={userNameErrMsg}
              defaultValue={defaultUserName}
            />
            <FormField.ErrorField
              errorMsg={userNameErrMsg}
              currentLength={
                userNameVal ? userNameVal.length : defaultUserName.length
              }
              maxLength={userName.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel isRequired={true}>Email</FormField.FormLabel>
            <FormField.FormInput
              id={userMail.name}
              register={register}
              errorMsg={userMailErrMsg}
              defaultValue={defaultUserMail}
            />
            <FormField.ErrorField
              errorMsg={userMailErrMsg}
              currentLength={
                userMailVal ? userMailVal.length : defaultUserMail.length
              }
              maxLength={userMail.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel isRequired={true}>
              Old password
            </FormField.FormLabel>
            <FormField.FormInput
              id={oldPassword.name}
              register={register}
              errorMsg={oldPassErrMsg}
              type={`${showPass ? "text" : "password"}`}
            />
            {showPass ? (
              <FaRegEye
                className="absolute top-[23px] right-[10px] cursor-pointer"
                onClick={() => {
                  setShowPass(false);
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-[23px] right-[10px] cursor-pointer"
                onClick={() => {
                  setShowPass(true);
                }}
              />
            )}
            <FormField.ErrorField
              errorMsg={oldPassErrMsg}
              currentLength={oldPasswordVal ? oldPasswordVal.length : 0}
              maxLength={oldPassword.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel isRequired={true}>
              New password
            </FormField.FormLabel>
            <FormField.FormInput
              id={password.name}
              register={register}
              errorMsg={passErrMsg}
              type={`${showPass ? "text" : "password"}`}
            />
            {showPass ? (
              <FaRegEye
                className="absolute top-[23px] right-[10px] cursor-pointer"
                onClick={() => {
                  setShowPass(false);
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute top-[23px] right-[10px] cursor-pointer"
                onClick={() => {
                  setShowPass(true);
                }}
              />
            )}
            <FormField.ErrorField
              errorMsg={passErrMsg}
              currentLength={passwordVal ? passwordVal.length : 0}
              maxLength={password.max}
            />
          </FormField>

          <div className="flex items-center gap-2 space-y-1.8 mb-4">
            {selectedProfImg ? (
              <UserAvatar
                userProfileImg={URL.createObjectURL(selectedProfImg)}
              />
            ) : null}
            <Label htmlFor="profile_pic" className="!text-fs_base">
              {selectedProfImg
                ? `Change profile image`
                : `Select profile image`}
            </Label>
            <div className="flex items-center gap-4">
              <Label
                className={`cursor-pointer border  rounded-md md:text-fs_base text-fs_small px-4 py-2 h-9`}
              >
                {selectedProfImg ? `change` : `select`}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute -left-[99999px]"
                  ref={ref}
                  onChange={handleImgChange}
                />
              </Label>
              {selectedProfImg ? (
                <Button
                  onClick={() => {
                    setSelectedProfImg(null);
                  }}
                  type="button"
                >
                  Clear
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
