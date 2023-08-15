import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().nonempty("Please fill in your email.").email("Please enter a valid email."),
  password: z.string().nonempty("Please fill in your password."),
});

export type SignInValues = z.infer<typeof signInSchema>;
