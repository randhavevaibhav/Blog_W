import { Link } from "react-router-dom";
import { Input } from "../../comonents/Input/Input";
import { Button } from "../../comonents/Button/Button";
import { Label } from "../../comonents/Label/Label";
import { FormContainer } from "../../comonents/FormContainer/FormContainer";
import { InputContainer } from "../../comonents/InputContainer/InputContainer";

export const SignIn = () => {
  return (
    <>
      <FormContainer>
        <FormContainer.Header>
          <h2 className="text-3xl">Sign In From</h2>
          <p>
            don't have an account please{" "}
            <span>
              <Link className="underline" to={"/signup"}>Sign up</Link>
            </span>
          </p>
        </FormContainer.Header>
        <FormContainer.Form>
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
        </FormContainer.Form>
      </FormContainer>
    </>
  );
};
