import { twMerge } from "tailwind-merge";

const defaultClasses = ``;
export const Label = (props) => {
  const { children, isRequired, className, ...rest } = props;
  const astrikClasses =
    isRequired && `after:ml-1 after:text-red-500 after:content-['*']`;
  const overrideClasses = twMerge(defaultClasses, astrikClasses, className);
  return (
    <label className={overrideClasses} {...rest}>
      {children}
    </label>
  );
};
