import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(["user", "employer", "admin"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const getProfileSchema = z.object({
  user: userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
  }),
});

export type UserProfile = z.infer<typeof getProfileSchema>;
