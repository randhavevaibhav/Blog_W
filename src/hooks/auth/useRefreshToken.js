import { authServices } from "@/services/auth/authServices";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { refreshService } = authServices();

  const refresh = async () => {
    const response = await refreshService();

    const {
      userId,
      userName,
      userMail,
      userProfileImg,
      userBio,
      userWebsiteURL,
      userLocation,
      userSkills,
    } = response.userInfo;

    setAuth((prev) => {
      return {
        ...prev,
        accessToken:response.accessToken,
        userId,
        userName,
        userMail,
        userProfileImg,
        userBio,
        userWebsiteURL,
        userLocation,
        userSkills,
      };
    });
    return response.accessToken;
  };

  return refresh;
};
