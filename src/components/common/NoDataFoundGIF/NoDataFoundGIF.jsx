import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export const NoDataFoundGIF = ({ children = "No data found !!" }) => {
  return (
   
     <>
      <DotLottieReact
        src="https://lottie.host/074dcb28-9466-493b-9078-04c1dcb619b7/AO3dthYnV7.lottie"
        loop
        autoplay
        className="size-[150px]"
      />
      <p className="text-fs_base font-medium">{children}</p>
    
     </>
  );
};
