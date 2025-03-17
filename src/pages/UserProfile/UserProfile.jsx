import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { InputContainer } from "../../components/common/InputContainer/InputContainer";
import { Input } from "../../components/common/Input/Input";
import { Label } from "../../components/common/Label/Label";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "./userProfileSchema";
import { Button } from "../../components/common/Button/Button";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import { useGetUser } from "../../hooks/user/useGetUser";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";


export const UserProfile = () => {
  const { userMail } = useParams();
  const { data, isPending, isError } = useGetUser();
  const {isPending:isUpdateUserPending,updateUser} = useUpdateUser();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  const onSubmit = (data) => {
    console.log("data in userProfile ===> ", data);
    
    updateUser({
        userMail:data.userMail,
        userName:data.userName
    });

    reset();
  };

  if (isPending) {
    return (
      <MainLayout>
        <LoadingWithText>Loading user info...</LoadingWithText>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout>
        <ErrorText>Error while loading user info...</ErrorText>
      </MainLayout>
    );
  }

  const userData= JSON.parse(data.user);
  return (
    <MainLayout className={`max-w-[65rem]`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Label isRequired={true} className={`font-semibold tracking-wide`}>
            User name:
          </Label>
          <Input {...register("userName")} defaultValue={userData.userName} />
          {errors.userName?.message && (
            <ErrorText>{errors.userName?.message}</ErrorText>
          )}
          <Label isRequired={true} className={`font-semibold tracking-wide`}>
            User mail:
          </Label>
          <Input defaultValue={userData.userMail} {...register("userMail")} />
          {errors.userMail?.message && (
            <ErrorText>{errors.userMail?.message}</ErrorText>
          )}
          <div>
            <Button>Update</Button>
          </div>
        </InputContainer>
      </form>
    
    </MainLayout>
  );
};
