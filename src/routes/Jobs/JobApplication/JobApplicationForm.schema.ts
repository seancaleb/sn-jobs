import { z } from "zod";

export const jobApplicationSchema = z.object({
  resume: z.string().nonempty("Please fill in your resume.").url("Resume should be a valid link."),
  coverLetter: z.string().nonempty("Please fill in your cover letter."),
});

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;
