import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

//hover:brightness-[0.9] hover:bg-green-600
const defaultClasses = `border px-8 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 hover:brightness-[0.9]`;

const varients = {
  primary: `bg-white text-black`,
  secondary: `bg-black text-white`,
  danger: `bg-red-500 text-white`,
  success: `bg-green-500 text-white`,
};

export const Button = forwardRef((props, ref) => {
  const { className, children, varient } = props;

  const overrideClasses = twMerge(defaultClasses, varients[varient], className);

  return (
    <button {...props} ref={ref} className={overrideClasses}>
      {children}
    </button>
  );
});
