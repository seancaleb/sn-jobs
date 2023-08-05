import { z } from "zod";
import { jobSchema } from "../jobs/jobs.type";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(["user", "employer", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  exp: z.number(),
  bookmark: z.string().array().optional(),
});

export const getProfileSchemaResponse = z.object({
  ...userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    userId: true,
    bookmark: true,
  }).shape,
});

export const updateProfileSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const updateProfileSchemaResponse = z.object({
  ...userSchema.omit({
    exp: true,
  }).shape,
});

export const updatePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export const deleteProfileSchema = z.object({
  password: z.string(),
});

export const bookmarkedJobsSchema = z.object({
  total: z.number(),
  bookmarkedJobs: jobSchema.array(),
});

export type GetUserProfileResponse = z.infer<typeof getProfileSchemaResponse>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileSchemaResponse>;
export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
export type DeleteProfile = z.infer<typeof deleteProfileSchema>;
export type BookmarkedJobs = z.infer<typeof bookmarkedJobsSchema>;
