import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
import { useAuth } from "../../hooks/auth/useAuth";
import { LoadingTextWithGIF } from "../../components/common/LoadingTextWithGIF/LoadingTextWithGIF";
export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        //console.log("calling refresh in verifyRefreshToken ==>");
        await refresh();
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

 

  return (
    <>{!persist ? <Outlet /> : isLoading ?<LoadingTextWithGIF>Loading ...</LoadingTextWithGIF> : <Outlet />}</>
  );
};
