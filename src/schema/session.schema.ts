import { object, string, ref } from "yup";

export const createSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Password must contain at least one letter and one number"
      ),
    email: string().email("Email must be valid").required("Email is required"),
  }),
});
