import * as yup from "yup";

export const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(`Please enter a valid email`)
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, `Password cannot exceed 20 characters.`),
  persist: yup.boolean().required(`Please check if you trust this device!`),
});
