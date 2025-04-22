import { twMerge } from "tailwind-merge";
const defaultClasses = `flex flex-col gap-1 py-4 pr-4`;

export const Hanmburger = (props) => {


   const { className,show ,trigger } = props;
    const overrideClasses = twMerge(defaultClasses, className);
  if (show) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div
      className={overrideClasses}
      onClick={() => trigger()}
    >
      <div
        className={`w-8 h-[3px]  ${
          show && "rotate-45 absolute "
        }  duration-300 rounded-xl bg-text-primary`}
      ></div>
      <div
        className={`w-8 h-[3px]  ${
          show && "-rotate-45"
        }  duration-300 rounded-xl bg-text-primary`}
      ></div>
      <div
        className={`w-8 h-[3px] ${
          show && "scale-0"
        }   duration-300 rounded-xl bg-text-primary`}
      ></div>
    </div>
  );
};
