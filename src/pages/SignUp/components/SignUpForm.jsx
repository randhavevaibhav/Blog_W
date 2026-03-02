import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { signUpFormSchema } from "./signUpFormSchema";
import { Card, CardContent } from "@/components/ui/card";
import { getYupSchemaFields } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/common/SiteLogo/SiteLogo";
import { getSignInPageLink } from "@/utils/getLinks";
import { AuthFormField } from "@/components/common/AuthFormField/AuthFormField";
import { SelectProfileImg } from "./SelectProfileImg";

const { firstName, email, password, confirmPassword } = getYupSchemaFields({
  schema: signUpFormSchema,
});

export const SignUpForm = ({ onSubmit }) => {
  const formMethods = useForm({ resolver: yupResolver(signUpFormSchema) });
  const profileImgRef = useRef(null);

  return (
    <div className="form_container p-3 max-w-[400px]  mx-auto">
      <header className="flex flex-col items-center mb-4 text-center">
        <SiteLogo />
        <h1 className="text-fs_3xl font-medium ">Sign up</h1>
        <p className="text-fs_base">
          have an account please&nbsp;
          <span>
            <Link
              className="underline"
              to={getSignInPageLink()}
              data-test={`signin-link`}
            >
              Sign in
            </Link>
          </span>
        </p>
      </header>
      <Card className="border-card-border">
        <CardContent className="lg:p-6 px-4 pb-4">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit((data) =>
                onSubmit({ data, reset:formMethods.reset, profileImgRef }),
              )}
              className={``}
            >
              <SelectProfileImg ref={profileImgRef} />
              <AuthFormField
                label="First Name"
                name={firstName.name}
                required
                max={firstName.max}
              />
              <AuthFormField
                label="Email"
                name={email.name}
                required
                max={email.max}
              />
              <AuthFormField
                label="Password"
                name={password.name}
                required
                type="password"
                max={password.max}
              />
              <AuthFormField
                label="Confirm Password"
                name={confirmPassword.name}
                required
                type="password"
              />
              <Button
                className="border-none w-full mt-2"
                variant={"success"}
                data-test={`signup-button`}
              >
                <span className="text-fs_xl">Sign up</span>
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
