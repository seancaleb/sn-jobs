import { z } from "zod";

export const defaultCities = [
  "Manila",
  "Makati City",
  "Taguig City",
  "Pasig City",
  "Quezon City",
] as const;

export const mutateJobSchema = z.object({
  title: z
    .string()
    .nonempty("Please fill in job title.")
    .min(6, "Job title should be at least 6 characters long.")
    .max(128, "Job title cannot exceed 128 characters.")
    .transform((str) => str.trim()),
  description: z
    .string()
    .nonempty("Please fill in job description.")
    .min(6, "Job description should be at least 6 characters long.")
    .transform((str) => str.trim()),
  requirements: z
    .array(
      z.object({
        requirement: z
          .string()
          .nonempty("Please fill in job requirement.")
          .min(6, "Job requirement should be at least 6 characters long.")
          .max(256, "Job requirement cannot exceed 256 characters."),
      })
    )
    .nonempty("Should contain at least one requirement"),
  location: z.enum([...defaultCities, ""], {
    errorMap: () => ({ message: "Please fill in job location." }),
  }),
});

export type MutateJobValues = z.infer<typeof mutateJobSchema>;
