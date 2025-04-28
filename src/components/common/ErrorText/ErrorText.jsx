import { twMerge } from "tailwind-merge";
const defaultClasses = `tracking-wide text-fs_small`;
import { MdReportGmailerrorred } from "react-icons/md";
export const ErrorText = ({ children, className = "" }) => {
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <p
      role="alert"
      className={`${overrideClasses} border border-[#e84e4f] bg-bg-error-txt w-fit px-2 py-1 rounded-md flex flex-row items-center gap-2 text-fs_xs tracking-wide text-error-txt`}
    >
      <span>
        <MdReportGmailerrorred className="text-fs_lg" />
      </span>
      {children}
    </p>
  );
};
