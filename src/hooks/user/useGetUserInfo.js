import { useQuery } from "@tanstack/react-query";
import { userServices } from "@/services/user/userServices";


export const useGetUserInfo = ({userId,currentUserId=0}) => {

  const {getUserInfoService} = userServices();
  
  const { isPending, data, error, isError,isRefetching } = useQuery({
    refetchOnWindowFocus:false,
    //IMP to add userId in queryKey to re-fetch posts when user log-out.
    queryKey: ["getUserInfo", userId.toString()],
    queryFn: ()=>{
      return getUserInfoService({userId,currentUserId})
    },
    //specify no. times re-fetch data when first attempt fails
    retry: 1,

    //useQuery does not support onSuccess and OnError callbacks
  });

  return { isPending, data, error, isError,isRefetching };
};
