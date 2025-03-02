import { twMerge } from "tailwind-merge";


const defaultClasses = `text-sm text-red-500 font-semibold`;
export const ErrorText = ({children,className=""})=>{
    const overrideClasses = twMerge(defaultClasses,className)
    return(<p role="alert" className={`${overrideClasses}`}>{children}</p>)
}