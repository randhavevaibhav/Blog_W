import { twMerge } from "tailwind-merge";


const defaultClasses = `text-fs_small text-red-500 tracking-wide`;
export const ErrorText = ({children,className=""})=>{
    const overrideClasses = twMerge(defaultClasses,className)
    return(<p role="alert" className={`${overrideClasses}`}>{children}</p>)
}