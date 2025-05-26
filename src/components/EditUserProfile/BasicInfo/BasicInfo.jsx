import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const BasicInfo = ({ register,errors }) => {
    const userBioErrMsg = errors.userBio?.message;
     const userWebsiteURLErrMsg = errors.userWebsiteURL?.message;
     const userLocationErrMsg = errors.userLocation?.message;
  return (
    <Card className="Basic_Info">
      <CardHeader>
        <CardTitle className="text-fs_xl">Basic info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="userBio" className="!text-fs_base">Bio</Label>
            <Input
              id="userBio"
              placeholder={"Bio"}
              {...register("userBio")}
              className={` ${
                userBioErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
            />
            <ErrorText
              className={`${userBioErrMsg ? `visible` : `invisible`} min-h-4`}
            >
              {userBioErrMsg}
            </ErrorText>
          </div>
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="userWebsiteURL" className="!text-fs_base">Website</Label>
            <Input
              id="userWebsiteURL"
              placeholder={"Website url"}
              {...register("userWebsiteURL")}
              className={` ${
                userWebsiteURLErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
            />
            <ErrorText
              className={`${userWebsiteURLErrMsg ? `visible` : `invisible`} min-h-4`}
            >
              {userWebsiteURLErrMsg}
            </ErrorText>
          </div>
           <div className="flex flex-col space-y-1.5">
            <Label htmlFor="userLocation" className="!text-fs_base">Location</Label>
            <Input
              id="userLocation"
              placeholder={"Location"}
              {...register("userLocation")}
              className={` ${
                userLocationErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
            />
            <ErrorText
              className={`${userLocationErrMsg ? `visible` : `invisible`} min-h-4`}
            >
              {userLocationErrMsg}
            </ErrorText>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
