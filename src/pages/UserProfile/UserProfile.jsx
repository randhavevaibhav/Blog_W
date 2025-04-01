import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { InputContainer } from "../../components/common/InputContainer/InputContainer";
import { Input } from "../../components/common/Input/Input";
import { Label } from "../../components/common/Label/Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "../../components/common/Button/Button";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { useAuth } from "../../hooks/auth/useAuth";
import { userProfileSchema } from "./userProfileSchema";

export const UserProfile = () => {
  const { auth } = useAuth();
  const { userName, userMail } = auth;
  const { updateUser, isPending } = useUpdateUser();




  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  const onSubmit = (data) => {
    // console.log("data in userProfile ===> ", data);
  
    updateUser({
      userMail: data.userMail,
      userName: data.userName,
    });

    reset();
  };

  if (isPending) {
    return (
      <MainLayout>
        <LoadingTextWithGIF>Loading user info...</LoadingTextWithGIF>
      </MainLayout>
    );
  }

  return (
    <MainLayout className={`max-w-[65rem] lg:p-0 p-4`}>
      <h1 className="text-4xl text-text-primary tracking-wide mb-8 font-semibold">
        Edit user info
      </h1>
      <div className="mx-auto max-w-[35rem]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-bg-shade p-4 rounded-md"
        >
          <InputContainer>
            <Label isRequired={true} className={`font-semibold tracking-wide`}>
              User name:
            </Label>
            <Input {...register("userName")} placeholder={userName} />
            {errors.userName?.message && (
              <ErrorText>{errors.userName?.message}</ErrorText>
            )}
          </InputContainer>
          <InputContainer>
            <Label isRequired={true} className={`font-semibold tracking-wide`}>
              User mail:
            </Label>
            <Input placeholder={userMail} {...register("userMail")} />
            {errors.userMail?.message && (
              <ErrorText>{errors.userMail?.message}</ErrorText>
            )}
          </InputContainer>
          <div>
            <Button>Update</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
