import React from "react";
import { ImSpinner9 } from "react-icons/im";
export const LoadingTextWithSpinner = ({ children="Loading ...",direction="inline" }) => {
  return (
    <div className={`flex items-center flex-col justify-center gap-6 ${direction==="center"?`h-screen`:``}`} data-test={`loading-spinner`}>
        <ImSpinner9 size={'40px'} className="animate-spin"/>
      <p className="text-fs_base font-medium">{children}</p>
    </div>
  );
};
