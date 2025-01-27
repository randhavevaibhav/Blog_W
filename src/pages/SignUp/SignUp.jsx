import { Link } from "react-router-dom";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";

export const SignUp = () => {
  return (
    <>
      <MainLayout className={`flex flex-col items-center justify-center`}>
        <header className="mx-auto flex flex-col gap-4 items-center">
            <h2 className="text-3xl">
                Sign Up From
            </h2>
            <p className="">Have an account please <span><Link className="underline">Log In</Link></span></p>
        </header>
        <form className="flex flex-col gap-4  min-w-[22rem]  p-2 ">
          <div className="flex flex-col gap-2 justify-between w-full">
            <label>Email&nbsp;*</label>
            <input
              type="text"
              className="px-2 py-1 border rounded-md outline-none bg-bg-primary"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between w-full">
            <label>Password&nbsp;*</label>
            <input
              type="password"
              className="px-2 py-1 border rounded-md outline-none bg-bg-primary"
                placeholder="Enter password"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between w-full">
            <label>Repeat password&nbsp;*</label>
            <input
              type="password"
              className="px-2 py-1 border rounded-md outline-none bg-bg-primary"
               placeholder="Repeat   password"
            />
          </div>
         
            <button className="border px-8 py-1 rounded-md text-bg-primary bg-text-primary hover:bg-gray-100 mx-auto">Submit</button>
        
        </form>
      </MainLayout>
    </>
  );
};
