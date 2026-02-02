import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

import { authServices } from "@/services/auth/authServices";
import { getHomePageLink, getTerminatePageLink } from "@/utils/getLinks";

export const useSignin = () => {
  const { setAuth, setPersist } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {signinService} = authServices();
  const from = location.state?.from?.pathname || getHomePageLink();

  const {
    mutate: signIn,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: signinService,
    onSuccess: (res) => {
      const accessToken = res.accessToken;
      const {
        userId,
        userName,
        userMail,
        userProfileImg,
        userBio,
        userSkills,
        userWebsiteURL,
        userLocation,
      } = res.userInfo;

      // console.log("res.data.accessToken ==> ", res.accessToken);

      setAuth({
        userId,
        accessToken,
        userName,
        userMail,
        userProfileImg,
        userBio,
        userSkills,
        userWebsiteURL,
        userLocation,
      });

      navigate(from, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
    },
    onError: (err) => {
      console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
        const terminated = err.response.data?.variables.SessionTerminated;
        toast.error(`${responseError}`);
        if (!terminated) {
          localStorage.clear();
          queryClient.clear();
          setAuth({});
          setPersist(false);
          navigate(getTerminatePageLink());
        }
        console.log("responseError ==> ", responseError);
      } else {
        toast.error(`Unknown error occurred !! `);
        console.log(err);
      }
    },
    onSettled:()=>{
      queryClient.clear();
    }
  });

  return {
    signIn,
    isPending,
    isError,
    isSuccess,
  };
};
