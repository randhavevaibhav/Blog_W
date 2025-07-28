import { twMerge } from "tailwind-merge";
import { MdReportGmailerrorred } from "react-icons/md";


const defaultClasses = `tracking-wide text-fs_small`;

export const ErrorText = (props) => {
  const  {children, className="",...rest} = props;
  const overrideClasses = twMerge(defaultClasses, className);
   
  return (
    <p
      role="alert"
      className={`${overrideClasses} border border-[#e84e4f] bg-bg-error-txt w-fit px-2 py-1 rounded-md flex flex-row items-center gap-2 text-fs_xs tracking-wide text-error-txt`}
      {...rest}
    >
      <span>
        <MdReportGmailerrorred className="text-fs_lg" />
      </span>
      {children}
    </p>
  );
};
