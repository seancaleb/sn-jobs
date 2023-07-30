import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    password: z.string().nonempty("Please fill out this field"),
    newPassword: z
      .string()
      .nonempty("Please fill out this field")
      .min(6, "Password is too short - minimum of 6 characters")
      .max(50, "Password too long"),
    confirmPassword: z.string().nonempty("Please fill out this field"),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        path: ["mismatchPasswords"],
        code: "custom",
        message: "The new passwords provided do not match",
      });
    }
  });

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
