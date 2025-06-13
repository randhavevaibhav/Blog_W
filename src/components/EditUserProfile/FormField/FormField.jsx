import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormLabel = (props) => {
  const { id, children, ...rest } = props;
  return (
    <Label htmlFor={id} {...rest} className="!text-fs_base">
      {children}
    </Label>
  );
};

const FormInput = (props) => {
  const { id, register, errorMsg, ...rest } = props;
  return (
    <Input
      {...rest}
      {...register(id, {
        setValueAs: (v) => v.trim(),
      })}
      className={` ${
        errorMsg ? `focus-visible:ring-0 border-red-500` : ``
      } transition-none`}
    />
  );
};

const ErrorField = ({ errorMsg, currentLength, maxLength }) => {
  return (
    <div className="flex justify-between">
      <ErrorText className={`${errorMsg ? `visible` : `invisible`} min-h-4`}>
        {errorMsg}
      </ErrorText>
      <span className="text-fs_small">
        {currentLength}/{maxLength}
      </span>
    </div>
  );
};

export const FormField = ({ children }) => {
  return (
    <>
      <div className="flex flex-col space-y-1.5 relative">{children}</div>
    </>
  );
};

FormField.FormLabel = FormLabel;
FormField.FormInput = FormInput;
FormField.ErrorField = ErrorField;
