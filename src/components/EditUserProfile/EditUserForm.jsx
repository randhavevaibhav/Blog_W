import React, { useRef, useState } from "react";
import { Label } from "../common/Label/Label";
import { Input } from "../common/Input/Input";
import { Button } from "../common/Button/Button";
import { InputContainer } from "../common/InputContainer/InputContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "./userProfileSchema";
import { useAuth } from "../../hooks/auth/useAuth";
import { ErrorText } from "../common/ErrorText/ErrorText";

export const EditUserForm = ({ onSubmit }) => {
  const { auth } = useAuth();
  const { userName, userMail } = auth;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
  });

  const profileImgRef = useRef(null);
  const [selectedProfImg, setSelectedProfImg] = useState(null);

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
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ data, reset, profileImgRef })
      )}
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
      <InputContainer>
        <Label isRequired={true} className={`font-semibold tracking-wide`}>
          Password:
        </Label>
        <Input
          type="password"
          placeholder={`New password`}
          {...register("password")}
        />
        {errors.password?.message && (
          <ErrorText>{errors.password?.message}</ErrorText>
        )}
      </InputContainer>
      <div>
        <Label className={"cursor-pointer border rounded-md px-4 py-1 text-sm"}>
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
      <div>
        <Button>Update</Button>
      </div>
    </form>
  );
};
