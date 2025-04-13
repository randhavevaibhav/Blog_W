import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const defaultClasses = `px-2 py-1 border rounded-md outline-none !bg-bg-primary`;

export const Input = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const overrideClasses = twMerge(defaultClasses, className);
  return <input {...rest} className={overrideClasses} ref={ref} />;
});
