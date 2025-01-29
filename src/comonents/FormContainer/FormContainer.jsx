import { MainLayout } from "../MainLayout/MainLayout";

const FormHeader = ({ children }) => {
  return (
    <header className="mx-auto flex flex-col gap-4 items-center">
      {children}
    </header>
  );
};

export const Form = ({ children }) => {
  return (
    <form className="flex flex-col gap-4  min-w-[22rem]  p-2 ">{children}</form>
  );
};

Form.Header = FormHeader;
