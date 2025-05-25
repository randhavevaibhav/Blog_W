import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export const LoadingTextWithGIF = ({ children }) => {
  return (
    <div className="flex items-center flex-col min-h-screen justify-center">
      <DotLottieReact
        src="https://lottie.host/be01b52f-376b-4585-858f-d1b47b82676e/cayMvU6wb4.lottie"
        loop
        autoplay
        className="h-[200px]"
      />
      <p className="text-fs_base font-medium">{children}</p>
    </div>
  );
};
