import { useEffect } from "react";
import { twMerge } from "tailwind-merge";


const defaultClasses = `max-w-[120rem] mx-auto mt-[var(--header-height)] mb-[var(--footer-height)] min-h-scminushd`;

export const MainLayout = (props) => {
  //for preventing scrolling to top when scrolled from one page to another
  const {children, className,...rest} = props
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <>
      <main className={overrideClasses} {...rest}>{children}</main>
    
    </>
  );
};
