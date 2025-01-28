import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const defaultClasses = `px-2 py-1 border rounded-md outline-none bg-bg-primary`;

export const Input = forwardRef((props, ref) => {
  const { className } = props;
  const overrideClasses = twMerge(defaultClasses, className);

  return <input {...props} className={overrideClasses} ref={ref} />;
});
