import React, { useCallback, useMemo, useRef } from "react";

import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "./userProfileSchema";

import { UserInfo } from "./UserInfo/UserInfo";
import { BasicInfo } from "./BasicInfo/BasicInfo";

export const EditUserForm = ({ onSubmit }) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  const profileImgRef = useRef(null);
const memoRegister = useCallback(register);
const memoWatch = useCallback(watch);
const memeoError = useMemo(()=>errors);
  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ data, reset, profileImgRef })
      )}
      className="flex flex-col gap-4"
    >
      <UserInfo register={register} errors={errors} ref={profileImgRef} watch={watch}/>
      <BasicInfo register={register} errors={errors} watch={watch} />
      <Button className="mb-4" variant="action">Update</Button>
    </form>
  );
};
