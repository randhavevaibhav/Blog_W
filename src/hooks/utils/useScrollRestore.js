import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import { useEffect } from "react";

export const useScrollRestore = ({key})=>{
    
      useEffect(() => {
        const scrollPos = getLocalStorageItem(key);
    
        if (scrollPos) {
          window.scrollTo(0, parseInt(scrollPos));
        }
    
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setLocalStorageItem(key, window.scrollY);
          }
        };
    
        document.addEventListener("scroll", handleScroll);
    
        return () => {
          document.removeEventListener("scroll", handleScroll);
        };
      }, []);
}