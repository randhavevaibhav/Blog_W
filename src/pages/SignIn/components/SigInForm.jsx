import React from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "./signInFormSchema";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getYupSchemaFields } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/common/SiteLogo/SiteLogo";
import { getSignupPageLink } from "@/utils/getLinks";
import { AuthFormField } from "@/components/common/AuthFormField/AuthFormField";

const { email, password } = getYupSchemaFields({
  schema: signInFormSchema,
});

export const SigInForm = ({ onSubmit }) => {
  const { persist, setPersist } = useAuth();

  const formMethods = useForm({ resolver: yupResolver(signInFormSchema) });

  return (
    <div className="form_container p-3 max-w-[400px]  mx-auto">
      <header className="flex flex-col items-center mb-4 text-center">
        <SiteLogo />
        <h1 className="text-fs_3xl font-medium ">Sign in</h1>
        <p className="text-fs_base">
          don't have an account please{" "}
          <span>
            <Link
              className="underline"
              to={getSignupPageLink()}
              data-test={`signup-link`}
            >
              Sign up
            </Link>
          </span>
        </p>
      </header>
      <Card className="border-card-border">
        <CardContent className="p-6">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit((data) =>
                onSubmit({ data, reset:formMethods.reset }),
              )}
              className={``}
            >
              <AuthFormField
                name={email.name}
                label={"Email"}
                required
                max={email.max}
              />
              <AuthFormField
                name={password.name}
                label={"Password"}
                required
                max={password.max}
                type="password"
              />

              <div className="flex space-x-2 mb-4 mt-1">
                <Checkbox
                  id="trust_device"
                  checked={persist}
                  onCheckedChange={(checked) => {
                    setPersist((prev) => !prev);
                  }}
                  data-test={`persist-login-check`}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="trust_device"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Trust this device
                  </label>
                </div>
              </div>

              <div className="flex">
                <Button
                  className="border-none w-full"
                  variant={"success"}
                  data-test={`signin-button`}
                >
                  <span className="text-fs_xl">Sign in</span>
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
