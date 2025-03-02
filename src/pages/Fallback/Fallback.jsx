import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import ErrorGIF from "../../assets/Error_GIF.gif";
export const Fallback = ({ error }) => {
  return (
    <MainLayout className={`mx-auto`}>
      <img src={ErrorGIF} alt="Error gif" />
      <div className="flex flex-col justify-center items-center border-black border error-cont">
        <h3 className="text-red-500">Something went Wrong !!!</h3>
        <pre>{error.message}</pre>
      </div>
    </MainLayout>
  );
};
