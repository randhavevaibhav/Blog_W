import React, { useRef, useState } from "react";

import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "./userProfileSchema";
import { useAuth } from "../../hooks/auth/useAuth";
import { ErrorText } from "../common/ErrorText/ErrorText";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <Card className="">
      <CardHeader>
        <CardTitle className="text-fs_xl">User info</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({ data, reset, profileImgRef })
          )}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userName">User Name</Label>
              <Input id="userName" placeholder={userName}  {...register("userName")}/>
              {errors.userName?.message && (
                <ErrorText>{errors.userName?.message}</ErrorText>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mail">Email</Label>
              <Input
                id="mail"
                placeholder={userMail}
                {...register("userMail")}
              />
              {errors.userMail?.message && (
                <ErrorText>{errors.userMail?.message}</ErrorText>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder={userName}
                {...register("password")}
              />
              {errors.password?.message && (
                <ErrorText>{errors.password?.message}</ErrorText>
              )}
            </div>
            <div className="flex flex-col gap-3 space-y-1.5">
            <Label htmlFor="profile_pic">User profile image</Label>
              <div>
              <Label className={`cursor-pointer border p-2 rounded-md`}>
                {`select image`}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute -left-[99999px]"
                  ref={profileImgRef}
                  onChange={handleImgChange}
                />
              </Label>
              </div>
              {selectedProfImg ? (
                <p className="text-fs_small">{selectedProfImg}</p>
              ) : null}
            </div>

            <Button>Update</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
