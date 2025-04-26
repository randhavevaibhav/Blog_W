import { twMerge } from "tailwind-merge";


const defaultClasses =  `tracking-wide text-fs_small`;
export const ErrorText = ({children,className=""})=>{
    console.log("defaultClasses ===> ",defaultClasses)
    const overrideClasses = twMerge(defaultClasses,className)
    return(<p role="alert" className={`${overrideClasses}`} style={{color:`#e83333`}}>{children}</p>)
}