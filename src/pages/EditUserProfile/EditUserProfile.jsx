import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { InputContainer } from "../../components/common/InputContainer/InputContainer";
import { Input } from "../../components/common/Input/Input";
import { Label } from "../../components/common/Label/Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/common/Button/Button";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { useAuth } from "../../hooks/auth/useAuth";
import { userProfileSchema } from "./userProfileSchema";
import { EditUserForm } from "../../components/EditUserProfile/EditUserForm";
import { useUploadFile } from "../../hooks/posts/useUploadFile";

 const UserProfile = () => {

  const { updateUser, isPending:isUpdateUserPending } = useUpdateUser();
const { isPending: isUploadFilePending, uploadFile } = useUploadFile();

const isPending = isUpdateUserPending || isUploadFilePending;
  const handleImgUpload = async ({ imgFile }) => {
    let resImgURL = "";
    const ImgFormData = new FormData();
    ImgFormData.append("user_profile_img_file", imgFile);
    const resData = await uploadFile({
      formData: ImgFormData,
      url: `profile-img`,
    });
    resImgURL = resData.fileURL;

    return resImgURL;
  };

 

  const onSubmit = async({data,reset,profileImgRef}) => {
    console.log("data in userProfile ===> ", data,profileImgRef);
    const profileImgFile = profileImgRef.current.files
      ? profileImgRef.current.files[0]
      : null;

      let profileImgUrl = null;

      if (profileImgFile) {
        profileImgUrl = await handleImgUpload({ imgFile: profileImgFile });
      }
  
    updateUser({
      userMail: data.userMail,
      userName: data.userName,
      password:data.password,
      profileImgUrl
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
    <MainLayout className={``}>
      <h1 className="text-4xl text-text-primary tracking-wide mb-8 font-semibold w-fit mx-auto">
        Edit user info
      </h1>
      <div className="md:mx-auto max-w-[35rem] mx-4">
       <EditUserForm onSubmit={onSubmit}/>
      </div>
    </MainLayout>
  );
};
export default UserProfile;