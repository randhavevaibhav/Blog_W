import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignup } from "../../hooks/auth/useSignup";


import { SignUpForm } from "../../components/SignUp/SignUpForm";
import { useUploadFile } from "../../hooks/posts/useUploadFile";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";

const SignUp = () => {
  const { signUp, isSignupPending,isSuccess:isSingupSuccess } = useSignup();
  const { isPending: isUploadFilePending,isSuccess:isUploadFileSuccess, uploadFile } = useUploadFile();

  const isPending = isSignupPending || isUploadFilePending;

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
    const profileImgFile = profileImgRef.current.files
      ? profileImgRef.current.files[0]
      : null;

    let profileImgUrl = null;

    if (profileImgFile) {
      profileImgUrl = await handleImgUpload({ imgFile: profileImgFile });
    }

    signUp({ ...data, profileImgUrl });

    reset();
  };

  if (isPending) {
    return (
     <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">Submitting form please wait...</LoadingTextWithSpinner>
      </MainLayout>

    );
  }
//Error is handled in useSignup hook

  if (isSingupSuccess) {
    return (
      <MainLayout className="mb-0">
        <LoadingTextWithSpinner direction="center">Redirecting ....</LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  return (
    <>
      <MainLayout className={` min-h-0 mb-0`}>
        <SignUpForm onSubmit={onSubmit} />
      </MainLayout>
    </>
  );
};

export default SignUp;
