import { Link } from "react-router-dom";
import { Input } from "../../comonents/Input/Input";
import { Button } from "../../comonents/Button/Button";
import { Label } from "../../comonents/Label/Label";
import { Form } from "../../comonents/FormContainer/FormContainer";
import { InputContainer } from "../../comonents/InputContainer/InputContainer";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";

// absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
export const SignIn = () => {
  return (
    <>
      <MainLayout
        className={`flex flex-col items-center justify-center h-scminushd`}
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <Form.Header>
            <h2 className="text-3xl">Sign In From</h2>
            <p>
              don't have an account please{" "}
              <span>
                <Link className="underline" to={"/signup"}>
                  Sign up
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
            <Button varient={"success"}>Submit</Button>
          </Form>
        </div>
      </MainLayout>
    </>
  );
};
