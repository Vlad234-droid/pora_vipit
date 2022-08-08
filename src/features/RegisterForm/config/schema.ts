import * as Yup from "yup";

const validateMin = (value) => {
  if (value) {
    return Yup.string().min(3).isValidSync(value);
  }
  return true;
};
const validateMax = (value) => {
  if (value) {
    return Yup.string().max(15).isValidSync(value);
  }
  return true;
};

export const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .test({
      message: "Field must be at least 3 characters",
      test: validateMin,
    })
    .test({
      message: "Field must be less than 15 characters",
      test: validateMax,
    }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Required")
    .max(30, "Email must contain less than 15 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase and number"
    )
    .max(
      20,
      "Password must contain less than 20 characters with at least one of each: uppercase, lowercase and number"
    )
    .matches(
      /(?=.*[A-Z])/,
      "Password must contain at least 1 upper case letter"
    )
    .matches(
      /(?=.*[a-z])/,
      "Password must contain at least 1 upper case letter"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords don't match."),
});
