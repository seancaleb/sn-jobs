import { z } from "zod";

export const deleteProfileSchema = z.object({
  password: z.string().nonempty("Please fill in your password."),
});

export type DeleteProfileValues = z.infer<typeof deleteProfileSchema>;
