import { twMerge } from "tailwind-merge";


const FormHeader = (props) => {
  const {children,className,...rest} = props;
  const defaultClasses = `flex flex-col gap-4 items-center`;
  const overrideClasses = twMerge(defaultClasses,className)
  return (
    <header className={overrideClasses} {...rest}>
      {children}
    </header>
  );
};

export const Form = (props) => {
  const {children,className,...rest} = props;
  const defaultClasses = `flex flex-col gap-3  min-w-[22rem]  p-2`;
  const overrideClasses = twMerge(defaultClasses,className)
  return (
    <form className={overrideClasses} {...rest}>
      {children}
    </form>
  );
};

Form.Header = FormHeader;
