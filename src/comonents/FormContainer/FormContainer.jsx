import { MainLayout } from "../MainLayout/MainLayout";


const FormHeader = ({ children }) => {
    return (
      <header className="mx-auto flex flex-col gap-4 items-center">
        {children}
      </header>
    );
  };
  
  const Form = ({ children }) => {
    return (
      <form className="flex flex-col gap-4  min-w-[22rem]  p-2 ">{children}</form>
    );
  }



export const FormContainer = ({ children }) => {
  return (
    <MainLayout className={`flex flex-col items-center justify-center`}>
      {children}
    </MainLayout>
  );
};

FormContainer.Header= FormHeader;
FormContainer.Form = Form;



