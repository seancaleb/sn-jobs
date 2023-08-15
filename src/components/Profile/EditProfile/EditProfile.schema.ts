import { z } from "zod";

export const editProfileSchema = z.object({
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
  email: z
    .string()
    .nonempty("Please fill in your email.")
    .email("Please enter a valid email.")
    .transform((str) => str.trim()),
});

export type EditProfileValues = z.infer<typeof editProfileSchema>;
