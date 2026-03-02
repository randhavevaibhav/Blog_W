import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const AuthFormField = ({
  label,
  name,
  type = "text",
  max,
  required = false,
  dataTest,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const [showPass, setShowPass] = useState(false);

  const errorMsg = errors[name]?.message;
  const charCount = watch(name)?.length || 0;
  const isPassword = type === "password";

  return (
    <div className="flex flex-col space-y-1.5 relative mt-1">
      <Label htmlFor={name} className="capitalize">
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </Label>

      <Input
        id={name}
        type={isPassword ? (showPass ? "text" : "password") : type}
        {...register(name)}
        className={cn(
          {
            "border-red-500 focus-visible:ring-0": errorMsg,
          },
          "transition-none border-card-border",
        )}
        data-test={dataTest || `${name}-input`}
        autoComplete="on"
      />

      {isPassword && (
        <div
          className="absolute top-[23px] right-[10px] cursor-pointer"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? < FaRegEye /> : <FaRegEyeSlash />}
        </div>
      )}

      <div className="flex justify-between">
        <ErrorText
          className={cn(
            {
              visible: errorMsg,
              invisible: !errorMsg,
            },
            "min-h-5",
          )}
          data-test={`${name}-error`}
        >
          {errorMsg}
        </ErrorText>
        {max && (
          <span className="text-fs_small">
            {charCount}/{max}
          </span>
        )}
      </div>
    </div>
  );
};
