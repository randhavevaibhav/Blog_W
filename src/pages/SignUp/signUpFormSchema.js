
import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`First name is required.`)
    .max(12, `First name cannot exceed 12 characters.`),
  email: yup
    .string()
    .email(`Please enter a valid email`)
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, `Password cannot exceed 20 characters.`),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
