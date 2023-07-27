import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(["user", "employer", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getProfileSchemaResponse = z.object({
  user: userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
  }),
});

export type UserProfileResponse = z.infer<typeof getProfileSchemaResponse>;

export const updateProfileSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

export const updateProfileSchemaResponse = z.object({
  user: userSchema,
});

export type UpdateProfileResponse = z.infer<typeof updateProfileSchemaResponse>;
