export const Hanmburger = ({ show = false, trigger = () => {} }) => {
  if (show) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div
      className="flex flex-col gap-1 md:hidden py-4 pr-4"
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
