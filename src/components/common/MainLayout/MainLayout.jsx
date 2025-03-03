import { useEffect } from "react";
import { twMerge } from "tailwind-merge";


const defaultClasses = `max-w-[75rem] mx-auto mt-[var(--header-height)] mb-[var(--footer-height)] min-h-scminushd`;

export const MainLayout = ({ children, className }) => {
  //for preventing scrolling to top when scrolled from one page to another
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <>
      <main className={overrideClasses}>{children}</main>
    
    </>
  );
};
