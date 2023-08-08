import { z } from "zod";

export const deleteProfileSchema = z.object({
  password: z.string().nonempty("Please fill out this field"),
});

export type DeleteProfileValues = z.infer<typeof deleteProfileSchema>;
