import { twMerge } from "tailwind-merge";

const defaultClasses = ``;
export const Label = ({ children, isRequired, className }) => {
  const astrikClasses =
    isRequired && `after:ml-1 after:text-red-500 after:content-['*']`;
  const overrideClasses = twMerge(defaultClasses, astrikClasses, className);
  return <label className={overrideClasses}>{children}</label>;
};
