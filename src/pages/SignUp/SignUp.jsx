import { Link } from "react-router-dom";
import { Input } from "../../comonents/Input/Input";
import { Button } from "../../comonents/Button/Button";
import { Label } from "../../comonents/Label/Label";
import { Form } from "../../comonents/FormContainer/FormContainer";
import { InputContainer } from "../../comonents/InputContainer/InputContainer";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";


export const SignUp = () => {
 
  return (
    <>
      <MainLayout className={`flex flex-col items-center h-scminushd`}>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <Form.Header>
            <h2 className="text-3xl">Sign Up From</h2>
            <p>
              Have an account please{" "}
              <span>
                <Link className="underline" to={"/signin"}>
                  Log In
                </Link>
              </span>
            </p>
          </Form.Header>
          <Form>
            <InputContainer>
              <Label isRequired={true}>Email</Label>
              <Input type="text" placeholder="Enter your email" />
            </InputContainer>
            <InputContainer>
              <Label isRequired={true}>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                autoComplete={"true"}
              />
            </InputContainer>
            <InputContainer>
              <Label isRequired={true}>Repeat password</Label>
              <Input
                type="password"
                placeholder="Repeat password"
                autoComplete={"true"}
              />
            </InputContainer>
            <Button className="border-none" varient={"success"}>Submit</Button>
          </Form>
        </div>
      </MainLayout>
    </>
  );
};
