import { twMerge } from "tailwind-merge";



const defaultClasses = `flex flex-col gap-2 justify-between w-full`;
export const InputContainer = ({ children,className }) => {
    const overrideClasses = twMerge(defaultClasses,className)
  return (
    <div className={overrideClasses}>{children}</div>
  );
};
