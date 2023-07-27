import { z } from "zod";

export const editProfileSchema = z.object({
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
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email")
    .transform((str) => str.trim()),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;
