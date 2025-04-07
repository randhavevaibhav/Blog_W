import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  userName: yup
  .string()
  .required(`User name is required.`)
  .max(12, `User name cannot exceed 12 characters.`),
  userMail: yup
     .string()
     .email(`Please enter a valid email`)
     .required("Email is required"),
    password: yup
       .string()
       .required("Password is required")
       .min(6, "Password must be at least 6 characters")
       .max(20, `Password cannot exceed 20 characters.`),
});
