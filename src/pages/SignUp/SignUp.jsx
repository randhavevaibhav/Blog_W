import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { useSignup } from "../../hooks/auth/useSignup";
import { SignUpForm } from "../../components/SignUp/SignUpForm";
import { useUploadFile } from "../../hooks/posts/useUploadFile";
import Loading from "../Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";

const SignUp = () => {
  const { signUp, isSignupPending, isSuccess: isSingupSuccess } = useSignup();
  const location = useLocation();
  const { auth } = useAuth();
  const {
    isPending: isUploadFilePending,
    isSuccess: isUploadFileSuccess,
    uploadFile,
  } = useUploadFile();

  const isPending = isSignupPending || isUploadFilePending;

  if (auth.accessToken) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  if (isPending) {
    return <Loading>Submitting form please wait...</Loading>;
  }

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

    signUp({ ...data, registered_at: new Date(), profileImgUrl });

    reset();
  };

  //Error is handled in useSignup hook

  return (
    <>
      <MainLayout className={` min-h-0 mb-0 mt-0`}>
        <SignUpForm onSubmit={onSubmit} />
      </MainLayout>
    </>
  );
};

export default SignUp;
