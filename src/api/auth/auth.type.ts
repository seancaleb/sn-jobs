import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  age: z.number().nullable(),
  role: z.enum(["admin", "user", "employer"]),
  exp: z.number(),
});

export type Token = {
  accessToken: string;
};

export type ResponseMessage = {
  message: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  firstName: string;
  lastName: string;
  role: "user" | "employer";
  email: string;
  password: string;
};

export type User = z.infer<typeof userSchema>;
