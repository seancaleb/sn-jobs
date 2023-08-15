import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    password: z.string().nonempty("Please fill in your password."),
    newPassword: z
      .string()
      .nonempty("Please fill in your new password.")
      .min(6, "Password should be at least 6 characters long.")
      .max(50, "Password cannot exceed 50 characters."),
    confirmPassword: z.string().nonempty("Please fill in your confirmation password."),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        path: ["mismatchPasswords"],
        code: "custom",
        message: "The new passwords provided do not match.",
      });
    }
  });

export type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;
