import * as yup from "yup";

const userNameCharUppLimit = 12;
const userEmailCharUppLimit = 50;
const oldPasswordCharUppLimit = 20;
const oldPasswordCharLowLimit = 6;
const passwordCharUppLimit = 20;
const passwordCharLowLimit = 6;

const userBioCharUppLimit = 160;
const userSkillsCharUppLimit = 160;
const userWebsiteURLCharUppLimit = 70;
const userLocationCharUppLimit = 30;

export const userProfileSchema = yup.object().shape(
  {
    userName: yup
      .string()
      .required(`User name is required.`)
      .max(
        userNameCharUppLimit,
        `User name cannot exceed ${userNameCharUppLimit} characters.`
      ),
    userMail: yup
      .string()
      .email(`Please enter a valid email`)
      .required("Email is required")
      .max(
        userEmailCharUppLimit,
        `Email cannot exceed ${userEmailCharUppLimit} characters.`
      ),
    oldPassword: yup
      .string()
      .required(`Old password required`)
      .min(
        oldPasswordCharLowLimit,
        `Password must be at least ${oldPasswordCharLowLimit} characters`
      )
      .max(
        oldPasswordCharUppLimit,
        `Password cannot exceed ${oldPasswordCharUppLimit} characters.`
      ),
    password: yup
      .string()
      .required("New password required")
      .min(
        passwordCharLowLimit,
        `Password must be at least ${passwordCharLowLimit} characters`
      )
      .max(
        passwordCharUppLimit,
        `Password cannot exceed ${passwordCharUppLimit} characters.`
      ),
    userBio: yup
      .string()
      .max(
        userBioCharUppLimit,
        `User bio cannot exceed ${userBioCharUppLimit} characters`
      ),
    userSkills: yup
      .string()
      .max(
        userSkillsCharUppLimit,
        `User skills cannot exceed ${userSkillsCharUppLimit} characters`
      ),
    userWebsiteURL: yup
      .string()
      .when("userWebsiteURL", {
        is: (val) => val,
        then: (val) => {
          return val.matches(
            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
            "Enter a correct url !!"
          );
        },

        otherwise: (val) => val,
      })
      .max(
        userWebsiteURLCharUppLimit,
        `Website url cannot exceed ${userWebsiteURLCharUppLimit} characters.`
      ),
    userLocation: yup
      .string()
      .max(
        userLocationCharUppLimit,
        `User location cannot exceed ${userLocationCharUppLimit} characters`
      ),
  },
  [
    // Add Cyclic deps here because when require itself
    ["userWebsiteURL", "userWebsiteURL"],
  ]
);
