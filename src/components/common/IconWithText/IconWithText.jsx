import { twMerge } from "tailwind-merge";

import { IoEyeOutline } from "react-icons/io5"
const defaultClasses = ``;
export const IconWithText =  ({Icon=IoEyeOutline,text="",className,iconSize=""})=>{
    const overrideClasses = twMerge(defaultClasses, className); 
    return (<>
    
     <div className={overrideClasses}>
          <span className=" flex items-center">
            <Icon className="mr-2" size={iconSize}/>{text}
          </span>
        </div>
    </>)
}