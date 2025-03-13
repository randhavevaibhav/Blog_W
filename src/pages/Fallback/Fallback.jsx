import React from "react";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import ErrorImg from "../../assets/Error.png";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
export const Fallback = ({ error }) => {
  return (
   
      <div className="h-screen flex flex-col justify-center items-center error-cont p-2 gap-2">
        <div className="w-[200px]">
          <img src={ErrorImg} alt="Error image" />
        </div>
        <ErrorText className="text-lg" >Something went Wrong !!!</ErrorText>
        <pre className="text-wrap">{error.message}</pre>
      </div>
  );
};
