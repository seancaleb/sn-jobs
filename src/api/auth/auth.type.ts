import { z } from "zod";
import { Role } from "@/types/user";
import { userSchema } from "../users/users.type";

export const parsedTokenSchema = z.object({
  ...userSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    userId: true,
    exp: true,
  }).shape,
});

export const tokenSchema = z.object({
  accessToken: z.string(),
});

export type Token = {
  accessToken: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: Exclude<Role, "admin">;
}
