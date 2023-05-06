import * as yup from "yup";

export const signUpSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is a required field"),
    password: yup
      .string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();
