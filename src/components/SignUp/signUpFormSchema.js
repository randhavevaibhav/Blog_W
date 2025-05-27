import * as yup from "yup";

const firstNameCharUppLimit = 12;
const emailCharUppLimit = 50;

const passwordCharUppLimit = 20;
const passwordCharLowLimit = 6;

export const signUpFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`First name is required.`)
    .max(
      firstNameCharUppLimit,
      `First name cannot exceed ${firstNameCharUppLimit} characters.`
    ),
  email: yup
    .string()
    .email(`Please enter a valid email`)
    .required("Email is required")
    .max(
      emailCharUppLimit,
      `email cannot exceed ${emailCharUppLimit} characters`
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(
      passwordCharLowLimit,
      `Password must be at least ${passwordCharLowLimit} characters`
    )
    .max(
      passwordCharUppLimit,
      `Password cannot exceed ${passwordCharUppLimit} characters.`
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
