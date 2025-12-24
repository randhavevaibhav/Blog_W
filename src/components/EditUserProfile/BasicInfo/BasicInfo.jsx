import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { userProfileSchema } from "../userProfileSchema";
import { getYupSchemaFields } from "@/utils/utils";
import { useAuth } from "@/hooks/auth/useAuth";
import { FormField } from "../FormField/FormField";
import { LuScrollText } from "react-icons/lu";

const { userBio, userWebsiteURL, userLocation, userSkills } =
  getYupSchemaFields({
    schema: userProfileSchema,
  });
export const BasicInfo = ({ register, errors, watch }) => {
  const userBioErrMsg = errors.userBio?.message;
  const userSkillErrMsg = errors.userSkills?.message;
  const userWebsiteURLErrMsg = errors.userWebsiteURL?.message;
  const userLocationErrMsg = errors.userLocation?.message;

  const userBioVal = watch(userBio.name);
  const userSkillsVal = watch(userSkills.name);
  const userWebsiteURLVal = watch(userWebsiteURL.name);
  const userLocationVal = watch(userLocation.name);

  const { auth } = useAuth();
  const {
    userBio: defaultUserBio,
    userWebsiteURL: defaultUserWebsiteURL,
    userLocation: defaultUserLocation,
    userSkills: defaultUserSkills,
  } = auth;

  const defaultUserBioVal = defaultUserBio ? defaultUserBio : "";
  const defaultUserWebsiteURLVal = defaultUserWebsiteURL
    ? defaultUserWebsiteURL
    : "";
  const defaultUserLocationVal = defaultUserLocation ? defaultUserLocation : "";
  const defaultUserSkillsVal = defaultUserSkills ? defaultUserSkills : "";

  return (
    <Card className="Basic_Info bg-card-bg">
      <CardHeader className={`md:pt-6 pt-4 pb-0 md:px-6 px-4`}>
        <CardTitle className="text-fs_2xl font-extrabold flex gap-2 items-center">
          <LuScrollText />
          Basic info
        </CardTitle>
      </CardHeader>
      <CardContent className={`md:p-6 pt-0 p-4`}>
        <div className="grid w-full items-center gap-2">
          <FormField>
            <FormField.FormLabel>Bio</FormField.FormLabel>
            <FormField.FormInput
              id={userBio.name}
              register={register}
              errorMsg={userBioErrMsg}
              defaultValue={defaultUserBioVal}
            />
            <FormField.ErrorField
              errorMsg={userBioErrMsg}
              currentLength={
                userBioVal ? userBioVal.length : defaultUserBioVal.length
              }
              maxLength={userBio.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel>Website</FormField.FormLabel>
            <FormField.FormInput
              id={userWebsiteURL.name}
              register={register}
              errorMsg={userWebsiteURLErrMsg}
              defaultValue={defaultUserWebsiteURLVal}
            />
            <FormField.ErrorField
              errorMsg={userWebsiteURLErrMsg}
              currentLength={
                userWebsiteURLVal
                  ? userWebsiteURLVal.length
                  : defaultUserWebsiteURLVal.length
              }
              maxLength={userWebsiteURL.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel>Location</FormField.FormLabel>
            <FormField.FormInput
              id={userLocation.name}
              register={register}
              errorMsg={userLocationErrMsg}
              defaultValue={defaultUserLocationVal}
            />
            <FormField.ErrorField
              errorMsg={userLocationErrMsg}
              currentLength={
                userLocationVal
                  ? userLocationVal.length
                  : defaultUserLocationVal.length
              }
              maxLength={userLocation.max}
            />
          </FormField>
          <FormField>
            <FormField.FormLabel>Skills</FormField.FormLabel>
            <FormField.FormInput
              id={userSkills.name}
              register={register}
              errorMsg={userSkillErrMsg}
              defaultValue={defaultUserSkillsVal}
            />
            <FormField.ErrorField
              errorMsg={userSkillErrMsg}
              currentLength={
                userSkillsVal
                  ? userSkillsVal.length
                  : defaultUserSkillsVal.length
              }
              maxLength={userSkills.max}
            />
          </FormField>
        </div>
      </CardContent>
    </Card>
  );
};
