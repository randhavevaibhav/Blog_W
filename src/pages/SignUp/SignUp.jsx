import { Link } from "react-router-dom";

import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { useSignup } from "../../hooks/auth/useSignup";

import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";

import { SignUpForm } from "../../components/SignUp/SignUpForm";
import { BgImage } from "../../components/common/Auth/BgImage";
import { useUploadFile } from "../../hooks/posts/useUploadFile";

const SignUp = () => {
  const { signUp, isSignupPending } = useSignup();
  const { isPending: isUploadFilePending, uploadFile } = useUploadFile();

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
    console.log("sigmup data ==> ", data);
    console.log("ProfileImgFile data ==> ", profileImgFile);

    let profileImgUrl = null;

    if (profileImgFile) {
      profileImgUrl = await handleImgUpload({ imgFile: profileImgFile });
    }

    signUp({ ...data, profileImgUrl });

    reset();
  };

  return (
    <>
      <MainLayout className={``}>
        {isPending ? (
          <LoadingTextWithGIF>
            Submitting form please wait...
          </LoadingTextWithGIF>
        ) : (
          <SignUpForm onSubmit={onSubmit} />
        )}
      </MainLayout>
    </>
  );
};

export default SignUp;
