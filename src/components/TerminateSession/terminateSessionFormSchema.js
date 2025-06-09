import * as yup from "yup";


const userEmailCharUppLimit = 50;
const passwordCharUppLimit = 20;
const passwordCharLowLimit = 6;


export const terminateSessionFormSchema = yup.object().shape({
  email: yup
    .string()
    .email(`Please enter a valid email`)
    .required("Email is required")
    .max(userEmailCharUppLimit, `Email cannot exceed ${userEmailCharUppLimit} characters.`),
  password: yup
    .string()
    .required("Password is required")
    .min(passwordCharLowLimit, `Password must be at least ${passwordCharLowLimit} characters`)
    .max(passwordCharUppLimit, `Password cannot exceed ${passwordCharUppLimit} characters.`),
});