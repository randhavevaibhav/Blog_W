import React from "react";
import { Spinner } from "../Spinner/Spinner";
export const LoadingTextWithSpinner = ({ children }) => {
  return (
    <div className="flex gap-2">
      {children}
      <Spinner />
    </div>
  );
};
