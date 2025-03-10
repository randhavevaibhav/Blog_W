import { twMerge } from "tailwind-merge";

import { IoEyeOutline } from "react-icons/io5";
const defaultClasses = ``;
export const IconWithText = (props) => {
  const {Icon=IoEyeOutline,text="",className,iconSize="",...rest} = props;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <>
      <button className={overrideClasses} {...rest}>
        <span className="flex items-center">
          <Icon className="mr-2" size={iconSize} />
          {text}
        </span>
      </button>
    </>
  );
};
