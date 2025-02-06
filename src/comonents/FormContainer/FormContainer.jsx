import { MainLayout } from "../MainLayout/MainLayout";

const FormHeader = ({ children }) => {
  return (
    <header className="mx-auto flex flex-col gap-4 items-center">
      {children}
    </header>
  );
};

export const Form = ({ children,...rest }) => {
  return (
    <form className="flex flex-col md:gap-4 gap-2  min-w-[22rem]  p-2 "{...rest}>{children}</form>
  );
};

Form.Header = FormHeader;
