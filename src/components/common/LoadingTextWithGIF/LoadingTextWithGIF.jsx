import { Spinner } from "../Spinner/Spinner";
import LoadingGIFDark from "../../../assets/loading-bird-dance-dark.gif"
import LoadingGIFLight from "../../../assets/loading-bird-dance-light.gif"
export const LoadingTextWithGIF = ({children}) => {
  return (
    <div className=" flex flex-col justify-center items-center w-full h-[600px] gap-4 ">
      <div className="">
      <img src={LoadingGIFDark} alt={'loading gif'} className="dark:block hidden"/>
      <img src={LoadingGIFLight} alt={'loading gif'}  className="dark:hidden block"/>
      </div>
      <p className="text-fs_base font-medium">{children}</p> <Spinner />
    </div>
  );
};
