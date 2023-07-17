import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "Must be at least 2 characters long")
    .max(50, "Cannot exceed 50 characters")
    .transform((str) => str.trim()),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Must be at least 2 characters long")
    .max(50, "Cannot exceed 50 characters")
    .transform((str) => str.trim()),
  role: z.enum(["user", "employer"], { required_error: "Role is required" }),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email")
    .transform((str) => str.trim()),
  password: z.string().nonempty("Password is required"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
