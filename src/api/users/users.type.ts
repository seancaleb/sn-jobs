import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(["user", "employer", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  exp: z.number(),
});

export const getProfileSchemaResponse = z.object({
  user: userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    userId: true,
  }),
});

export const updateProfileSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
});

export const updateProfileSchemaResponse = z.object({
  user: userSchema,
});

export const updatePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string(),
});

export type GetUserProfileResponse = z.infer<typeof getProfileSchemaResponse>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type UpdateProfileResponse = z.infer<typeof updateProfileSchemaResponse>;
export type UpdatePassword = z.infer<typeof updatePasswordSchema>;
