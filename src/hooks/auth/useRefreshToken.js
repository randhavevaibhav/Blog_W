import { axiosPrivate } from "../../services/rootAPI/api";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth,auth } = useAuth();
  //console.log("calling useRefreshToken ==>");
  // const {userId} = auth;

  

  const refresh = async () => {
    // console.log(" useRefreshToken userId ==>",userId);
    // const response = await axiosPrivate.get(`/refreshtoken/:${userId}`);

    const response = await axiosPrivate.get(`/refreshtoken`);

    const {userId,userName,userMail,userProfileImg,userBio,userWebsiteURL,userLocation,userSkills} = response.data.userInfo;
    // console.log("response.data.userInfo ==> ",response.data.userInfo);

   
    setAuth((prev) => {
      //console.log(`previous auth token ==> ${JSON.stringify(prev.accessToken)}`);
      //console.log( `access token from refresh req ==> ${response.data.accessToken}`);

      return {
        ...prev,
        accessToken: response.data.accessToken,
        userId,
        userName,
        userMail,
        userProfileImg,
        userBio,
        userWebsiteURL,
        userLocation,
        userSkills
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};
