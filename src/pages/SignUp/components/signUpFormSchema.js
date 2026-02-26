import { object, string ,ref} from "yup";

const firstNameCharUppLimit = 12;
const emailCharUppLimit = 50;

const passwordCharUppLimit = 20;
const passwordCharLowLimit = 6;

export const signUpFormSchema =object().shape({
  firstName: string()
    .required(`First name is required.`)
    .max(
      firstNameCharUppLimit,
      `First name cannot exceed ${firstNameCharUppLimit} characters.`
    ),
  email: string()
    .email(`Please enter a valid email`)
    .required("Email is required")
    .max(
      emailCharUppLimit,
      `email cannot exceed ${emailCharUppLimit} characters`
    ),
  password: string()
    .required("Password is required")
    .min(
      passwordCharLowLimit,
      `Password must be at least ${passwordCharLowLimit} characters`
    )
    .max(
      passwordCharUppLimit,
      `Password cannot exceed ${passwordCharUppLimit} characters.`
    ),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("password")], "Passwords must match"),
});
