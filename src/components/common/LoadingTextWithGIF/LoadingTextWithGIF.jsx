import { Spinner } from "../Spinner/Spinner";
import LoadingGIFDark from "../../../assets/loading-bird-dance-dark.gif";
import LoadingGIFLight from "../../../assets/loading-bird-dance-light.gif";
import { useThemeContext } from "@/hooks/Theme/useThemeContext";
export const LoadingTextWithGIF = ({ children }) => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  return (
    <div className=" flex flex-col justify-center items-center w-full h-[600px] gap-4 ">
      <div className="">
        {isDark ? (
          <img src={LoadingGIFDark} alt={"loading gif"} className="" />
        ) : (
          <img src={LoadingGIFLight} alt={"loading gif"} className="" />
        )}
      </div>
      <p className="text-fs_base font-medium">{children}</p> <Spinner />
    </div>
  );
};
