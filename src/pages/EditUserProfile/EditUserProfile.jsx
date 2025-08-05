import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";

import { EditUserForm } from "../../components/EditUserProfile/EditUserForm";
import { useUploadFile } from "../../hooks/posts/useUploadFile";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "../Loading/Loading";

const EditUserProfile = () => {
  const {
    updateUser,
    isPending: isUpdateUserPending,
    isSuccess,
  } = useUpdateUser();
  const { isPending: isUploadFilePending, uploadFile } = useUploadFile();
  const { auth } = useAuth();
  const { userProfileImg } = auth;

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

  const onSubmit = async ({ data, reset, profileImgRef }) => {
    // console.log("data in userProfile ===> ", data, profileImgRef);
    const profileImgFile = profileImgRef.current.files
      ? profileImgRef.current.files[0]
      : null;

    let profileImgUrl = null;

    if (profileImgFile) {
      profileImgUrl = await handleImgUpload({ imgFile: profileImgFile });
    }
    if (!profileImgFile) {
      profileImgUrl = userProfileImg;
    }
    // console.log("data in userProfile ===> ", data);
    // return
    updateUser({
      userMail: data.userMail,
      userName: data.userName,
      oldPassword: data.oldPassword,
      password: data.password,
      profileImgUrl,
      userBio: data.userBio,
      userSkills: data.userSkills,
      userWebsiteURL: data.userWebsiteURL,
      userLocation: data.userLocation,
    });

    reset();
  };

  if (isPending) {
    return <Loading>Updating user info...</Loading>;
  }

  //Error handled in useUpdateUser hook

  if (isSuccess) {
    return <Loading>Redirecting ...</Loading>;
  }

  return (
    <MainLayout className={`mb-0 py-4`}>
      <h1 className="text-fs_4xl text-text-primary tracking-wide  font-extrabold w-fit mx-auto" data-test={`edit-user-profile-header`}>
        Edit Profile
      </h1>
      <div className="md:mx-auto max-w-[40rem] mx-2">
        <EditUserForm onSubmit={onSubmit} />
      </div>
    </MainLayout>
  );
};
export default EditUserProfile;
