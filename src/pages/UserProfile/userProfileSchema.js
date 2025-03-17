import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  userName: yup
  .string()
  .required(`user name is required.`)
  .max(12, `user name cannot exceed 12 characters.`),
  userMail: yup
     .string()
     .email(`Please enter a valid email`)
     .required("Email is required")
});
