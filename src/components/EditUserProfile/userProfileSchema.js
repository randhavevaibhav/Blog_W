import * as yup from "yup";

export const userProfileSchema = yup.object().shape(
  {
    userName: yup
      .string()
      .required(`User name is required.`)
      .max(12, `User name cannot exceed 12 characters.`),
    userMail: yup
      .string()
      .email(`Please enter a valid email`)
      .required("Email is required"),
    oldPassword: yup
      .string()
      .required(`Old password required`)
      .min(6, "Password must be at least 6 characters")
      .max(20, `Password cannot exceed 20 characters.`),
    password: yup
      .string()
      .required("New password required")
      .min(6, "Password must be at least 6 characters")
      .max(20, `Password cannot exceed 20 characters.`),
    userBio: yup.string().max(120, `User bio cannot exceed 120 characters`),
    userWebsiteURL: yup.string().when("userWebsiteURL", {
      is: (val) => val,
      then: (val) => {
        return val
          .matches(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "Enter a correct url !!"
          )
          .max(70, "Website url cannot exceed 70 characters.");
      },

      otherwise: (val) => val,
    }),
    userLocation: yup
      .string()
      .max(30, `User location cannot exceed 30 characters`),
  },
  [
    // Add Cyclic deps here because when require itself
    ["userWebsiteURL", "userWebsiteURL"],
  ]
);
