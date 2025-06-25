import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";

import { EditUserForm } from "../../components/EditUserProfile/EditUserForm";
import { useUploadFile } from "../../hooks/posts/useUploadFile";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";

const UserProfile = () => {
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
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Updating user info...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  //Error handled in useUpdateUser hook

  if (isSuccess) {
    return (
      <MainLayout>
        <LoadingTextWithSpinner>Redirecting ...</LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  return (
    <MainLayout className={`mb-0`}>
      <h1 className="text-fs_4xl text-text-primary tracking-wide  font-semibold w-fit mx-auto">
        Edit user info
      </h1>
      <div className="md:mx-auto max-w-[35rem] mx-4">
        <EditUserForm onSubmit={onSubmit} />
      </div>
    </MainLayout>
  );
};
export default UserProfile;
