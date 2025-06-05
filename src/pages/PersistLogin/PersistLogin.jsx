import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/auth/useRefreshToken";
import { useAuth } from "../../hooks/auth/useAuth";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
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
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
          <LoadingTextWithSpinner direction="center">
            Loading ...
          </LoadingTextWithSpinner>
        </MainLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
};
