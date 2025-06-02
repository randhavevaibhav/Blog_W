import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { userProfileSchema } from "../userProfileSchema";
import { getYupSchemaFields } from "@/utils/utils";
import { useAuth } from "@/hooks/auth/useAuth";

const { userBio, userWebsiteURL, userLocation } = getYupSchemaFields({
  schema: userProfileSchema,
});
export const BasicInfo = ({ register, errors, watch }) => {
  const userBioErrMsg = errors.userBio?.message;
  const userWebsiteURLErrMsg = errors.userWebsiteURL?.message;
  const userLocationErrMsg = errors.userLocation?.message;

  const userBioVal = watch(userBio.name);
  const userWebsiteURLVal = watch(userWebsiteURL.name);
  const userLocationVal = watch(userLocation.name);

  const { auth } = useAuth();
  const {
    userBio: defaultUserBio,
    userWebsiteURL: defaultUserWebsiteURL,
    userLocation: defaultUserLocation,
  } = auth;

  const [charaCount, setCharaCount] = useState({
    bioCharCount: 0,
    websiteURLCharCount: 0,
    locationCharCount: 0,
  });

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      bioCharCount: userBioVal?.length,
    }));
  }, [userBioVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      websiteURLCharCount: userWebsiteURLVal?.length,
    }));
  }, [userWebsiteURLVal]);

  useEffect(() => {
    setCharaCount((prev) => ({
      ...prev,
      locationCharCount: userLocationVal?.length,
    }));
  }, [userLocationVal]);

  return (
    <Card className="Basic_Info">
      <CardHeader>
        <CardTitle className="text-fs_xl">Basic info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={userBio.name} className="!text-fs_base">
              Bio
            </Label>
            <Input
              id={userBio.name}
              placeholder={"Bio"}
              {...register(userBio.name)}
              className={` ${
                userBioErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
              defaultValue={defaultUserBio}
            />

            <div className="flex justify-between">
              <ErrorText
                className={`${userBioErrMsg ? `visible` : `invisible`} min-h-4`}
              >
                {userBioErrMsg}
              </ErrorText>
              <span className="text-fs_small">
                {charaCount.bioCharCount}/{userBio.max}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={userWebsiteURL.name} className="!text-fs_base">
              Website
            </Label>
            <Input
              id={userWebsiteURL.name}
              placeholder={"Website url"}
              {...register(userWebsiteURL.name)}
              className={` ${
                userWebsiteURLErrMsg
                  ? `focus-visible:ring-0 border-red-500`
                  : ``
              } transition-none`}
              defaultValue={defaultUserWebsiteURL}
            />
            <div className="flex justify-between">
              <ErrorText
                className={`${
                  userWebsiteURLErrMsg ? `visible` : `invisible`
                } min-h-4`}
              >
                {userWebsiteURLErrMsg}
              </ErrorText>
              <span className="text-fs_small">
                {charaCount.websiteURLCharCount}/{userWebsiteURL.max}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor={userLocation.name} className="!text-fs_base">
              Location
            </Label>
            <Input
              id={userLocation.name}
              placeholder={"Location"}
              {...register(userLocation.name)}
              className={` ${
                userLocationErrMsg ? `focus-visible:ring-0 border-red-500` : ``
              } transition-none`}
              defaultValue={defaultUserLocation}
            />
            <div className="flex justify-between">
              <ErrorText
                className={`${
                  userLocationErrMsg ? `visible` : `invisible`
                } min-h-4`}
              >
                {userLocationErrMsg}
              </ErrorText>
              <span className="text-fs_small">
                {charaCount.locationCharCount}/{userLocation.max}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
