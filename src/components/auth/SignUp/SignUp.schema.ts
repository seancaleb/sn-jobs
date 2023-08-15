import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty("Please fill in your first name.")
    .min(2, "First name should be at least 2 characters long.")
    .max(50, "First name cannot exceed 50 characters.")
    .transform((str) => str.trim()),
  lastName: z
    .string()
    .nonempty("Please fill in your last name.")
    .min(2, "Last name should be at least 2 characters long.")
    .max(50, "Last name cannot exceed 50 characters.")
    .transform((str) => str.trim()),
  role: z.enum(["user", "employer"], { required_error: "Role is required" }),
  email: z
    .string()
    .nonempty("Please fill in your email.")
    .email("Please enter a valid email.")
    .transform((str) => str.trim()),
  password: z
    .string()
    .nonempty("Please fill in your password.")
    .min(6, "Password should be at least 6 characters long.")
    .max(50, "Password cannot exceed 50 characters."),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
