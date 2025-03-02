import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

//hover:brightness-[0.9] hover:bg-green-600
const defaultClasses = `border px-8 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 border-none hover:shadow`;

const varients = {
  primary: `bg-white text-black  hover:bg-[#FAF9F6]`,
  secondary: `bg-black text-white `,
  danger: `bg-red-500 text-white hover:bg-red-600`,
  success: `bg-green-500 text-white hover:bg-700`,
};

export const Button = forwardRef((props, ref) => {
  const { className, children, varient, isDisable, ...rest } = props;

  const overrideClasses = twMerge(defaultClasses, varients[varient], className);

  return (
    <button
      {...rest}
      disabled={isDisable}
      ref={ref}
      className={`${overrideClasses}`}
    >
      {children}
    </button>
  );
});
