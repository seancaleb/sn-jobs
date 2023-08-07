import { z } from "zod";

export const jobApplicationSchema = z.object({
  resume: z.string().nonempty("Resume is required").url("Not a valid link"),
  coverLetter: z.string().nonempty("Cover letter is required"),
});

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;
